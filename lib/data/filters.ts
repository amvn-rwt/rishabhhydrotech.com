import type { FilterGroup, ProductDivision } from "@/lib/types/product.types";
import { getBrandsForDivision } from "@/lib/data/brands";
import {
  getHydraulicCategory,
  hydraulicTaxonomy,
  toTaxonomySlug,
} from "@/lib/data/taxonomy";

type CatalogueFilterScope = {
  division?: ProductDivision;
  /** Category slug from the URL path, when on a category or type page. */
  categorySlug?: string;
};

function categoryFilterGroup(): FilterGroup {
  return {
    id: "category",
    label: "Category",
    options: hydraulicTaxonomy.map((category) => ({
      label: category.name,
      value: category.slug,
    })),
  };
}

function brandFilterGroup(categorySlug?: string): FilterGroup | undefined {
  const category = categorySlug
    ? getHydraulicCategory(categorySlug)
    : undefined;

  const options = category
    ? [...category.makes]
        .toSorted((a, b) => a.localeCompare(b))
        .map((make) => ({ label: make, value: toTaxonomySlug(make) }))
    : getBrandsForDivision().map((brand) => ({
        label: brand.name,
        value: brand.slug,
      }));

  if (options.length === 0) return undefined;

  return { id: "brand", label: "Brand", options };
}

/**
 * Top-level types for the current category. Selecting a parent type also
 * matches its subtypes (see `expandTypeFilterSlugs`).
 */
function typeFilterGroup(categorySlug?: string): FilterGroup | undefined {
  if (!categorySlug) return undefined;

  const category = getHydraulicCategory(categorySlug);
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
 * Pneumatic filters deferred until client taxonomy (WEBSITE_PLAN §6.3).
 */
export function getFiltersForCatalogue(
  scope: CatalogueFilterScope = {},
): FilterGroup[] {
  const groups: (FilterGroup | undefined)[] = [
    categoryFilterGroup(),
    brandFilterGroup(scope.categorySlug),
    typeFilterGroup(scope.categorySlug),
  ];

  return groups.filter((group): group is FilterGroup => Boolean(group));
}
