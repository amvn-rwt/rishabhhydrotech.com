import type { FilterGroup, ProductDivision } from "@/lib/types/product.types";
import {
  getCategoryForDivision,
  getTaxonomyForDivision,
  hydraulicTaxonomy,
  pneumaticTaxonomy,
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
 * Hub: category. Category page: category types.
 * Brand filters stay off the catalogue until products have real OEM links.
 */
export function getFiltersForCatalogue(
  scope: CatalogueFilterScope = {},
): FilterGroup[] {
  const groups: (FilterGroup | undefined)[] = [
    categoryFilterGroup(scope.division),
    typeFilterGroup(scope.division, scope.categorySlug),
  ];

  return groups.filter((group): group is FilterGroup => Boolean(group));
}
