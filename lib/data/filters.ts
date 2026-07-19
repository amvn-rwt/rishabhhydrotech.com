import type { FilterGroup, ProductDivision } from "@/lib/types/product.types";
import { getBrandsForDivision } from "@/lib/data/brands";
import {
  getCategoryForDivision,
  getTaxonomyForDivision,
  hydraulicTaxonomy,
  pneumaticTaxonomy,
  toTaxonomySlug,
} from "@/lib/data/taxonomy";

type CatalogueFilterScope = {
  division?: ProductDivision;
  /** Category slug from the URL path, when on a category or type page. */
  categorySlug?: string;
};

function categoryFilterGroup(division?: ProductDivision): FilterGroup {
  const taxonomy = division
    ? getTaxonomyForDivision(division)
    : [...hydraulicTaxonomy, ...pneumaticTaxonomy];

  const seen = new Set<string>();
  const options: FilterGroup["options"] = [];

  for (const category of taxonomy) {
    if (seen.has(category.slug)) continue;
    seen.add(category.slug);
    options.push({
      label: category.name,
      value: category.slug,
    });
  }

  return {
    id: "category",
    label: "Category",
    options,
  };
}

function brandFilterGroup(
  division?: ProductDivision,
  categorySlug?: string,
): FilterGroup | undefined {
  const category =
    categorySlug && division
      ? getCategoryForDivision(division, categorySlug)
      : categorySlug
        ? (getCategoryForDivision("hydraulic", categorySlug) ??
          getCategoryForDivision("pneumatic", categorySlug))
        : undefined;

  const options = category
    ? [...category.makes]
        .toSorted((a, b) => a.localeCompare(b))
        .map((make) => ({ label: make, value: toTaxonomySlug(make) }))
    : getBrandsForDivision(division ?? "hydraulic").map((brand) => ({
        label: brand.name,
        value: brand.slug,
      }));

  // Hub with no division: show all brands
  const hubOptions =
    !category && !division
      ? [
          ...new Map(
            [...getBrandsForDivision("hydraulic"), ...getBrandsForDivision("pneumatic")].map(
              (brand) => [brand.slug, { label: brand.name, value: brand.slug }],
            ),
          ).values(),
        ].toSorted((a, b) => a.label.localeCompare(b.label))
      : options;

  if (hubOptions.length === 0) return undefined;

  return { id: "brand", label: "Brand", options: hubOptions };
}

/**
 * Top-level types for the current category. Selecting a parent type also
 * matches its subtypes (see `expandTypeFilterSlugs`).
 */
function typeFilterGroup(
  division?: ProductDivision,
  categorySlug?: string,
): FilterGroup | undefined {
  if (!categorySlug) return undefined;

  const category = division
    ? getCategoryForDivision(division, categorySlug)
    : (getCategoryForDivision("hydraulic", categorySlug) ??
      getCategoryForDivision("pneumatic", categorySlug));

  if (!category?.types.length) return undefined;

  return {
    id: "type",
    label: "Type",
    options: category.types.map((type) => ({
      label: type.label,
      value: type.slug,
    })),
  };
}

/**
 * Filter groups scoped to the current catalogue page.
 * Hub: category + all brands. Category page: its makes + its types.
 */
export function getFiltersForCatalogue(
  scope: CatalogueFilterScope = {},
): FilterGroup[] {
  const groups: (FilterGroup | undefined)[] = [
    categoryFilterGroup(scope.division),
    brandFilterGroup(scope.division, scope.categorySlug),
    typeFilterGroup(scope.division, scope.categorySlug),
  ];

  return groups.filter((group): group is FilterGroup => Boolean(group));
}
