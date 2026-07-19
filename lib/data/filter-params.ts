import { expandTypeFilterSlugs } from "@/lib/data/taxonomy";
import type { Product } from "@/lib/types/product.types";

/** Filter group ids that map to URL query keys. */
export const CATALOGUE_FILTER_IDS = ["category", "type"] as const;

export type CatalogueFilterId = (typeof CATALOGUE_FILTER_IDS)[number];

export type CatalogueSelectedFilters = Partial<
  Record<CatalogueFilterId, string[]>
>;

export type CatalogueSearchParams = {
  [key: string]: string | string[] | undefined;
};

function normalizeParamValues(
  value: string | string[] | undefined,
): string[] {
  if (value == null) return [];

  const raw = Array.isArray(value) ? value : [value];
  const values: string[] = [];

  for (const entry of raw) {
    for (const part of entry.split(",")) {
      const trimmed = part.trim();
      if (trimmed) values.push(trimmed);
    }
  }

  return [...new Set(values)];
}

/** Parse catalogue filter query params (`?category=pumps&type=gear-pump`). */
export function parseCatalogueSearchParams(
  searchParams?: CatalogueSearchParams,
): CatalogueSelectedFilters {
  if (!searchParams) return {};

  const selected: CatalogueSelectedFilters = {};

  for (const id of CATALOGUE_FILTER_IDS) {
    const values = normalizeParamValues(searchParams[id]);
    if (values.length > 0) selected[id] = values;
  }

  return selected;
}

/** Serialize selected filters to a query string (no leading `?`). */
export function serializeCatalogueFilters(
  selected: CatalogueSelectedFilters,
): string {
  const params = new URLSearchParams();

  for (const id of CATALOGUE_FILTER_IDS) {
    const values = selected[id];
    if (values && values.length > 0) {
      params.set(id, values.join(","));
    }
  }

  return params.toString();
}

export function toggleCatalogueFilterValue(
  selected: CatalogueSelectedFilters,
  groupId: CatalogueFilterId,
  value: string,
): CatalogueSelectedFilters {
  const current = selected[groupId] ?? [];
  const nextValues = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  const next: CatalogueSelectedFilters = { ...selected };
  if (nextValues.length === 0) {
    delete next[groupId];
  } else {
    next[groupId] = nextValues;
  }
  return next;
}

export function hasSelectedCatalogueFilters(
  selected: CatalogueSelectedFilters,
): boolean {
  return CATALOGUE_FILTER_IDS.some((id) => (selected[id]?.length ?? 0) > 0);
}

/** Total selected option values across all filter groups. */
export function countSelectedCatalogueFilters(
  selected: CatalogueSelectedFilters,
): number {
  let count = 0;
  for (const id of CATALOGUE_FILTER_IDS) {
    count += selected[id]?.length ?? 0;
  }
  return count;
}

type PathScope = {
  category?: string;
  /** Type/subtype slugs from the URL path (after category). */
  typeSlugs?: string[];
};

/**
 * Resolve effective filters: path scope locks category/type;
 * query params apply for unlocked groups.
 */
export function resolveCatalogueFilters({
  pathScope,
  searchParams,
}: {
  pathScope?: PathScope;
  searchParams?: CatalogueSearchParams;
}): {
  selectedFilters: CatalogueSelectedFilters;
  lockedFilterIds: CatalogueFilterId[];
  productsFilter: CatalogueSelectedFilters;
} {
  const selectedFilters = parseCatalogueSearchParams(searchParams);
  const lockedFilterIds: CatalogueFilterId[] = [];
  const productsFilter: CatalogueSelectedFilters = { ...selectedFilters };

  if (pathScope?.category) {
    lockedFilterIds.push("category");
    productsFilter.category = [pathScope.category];
    delete selectedFilters.category;
  }

  if (pathScope?.typeSlugs && pathScope.typeSlugs.length > 0) {
    lockedFilterIds.push("type");
    const leaf = pathScope.typeSlugs[pathScope.typeSlugs.length - 1];
    productsFilter.type = [leaf];
    delete selectedFilters.type;
  }

  return { selectedFilters, lockedFilterIds, productsFilter };
}

function productMatchesTypeFilter(
  product: Product,
  typeValues: string[],
): boolean {
  if (!product.type) return false;

  for (const typeValue of typeValues) {
    const matchingSlugs = expandTypeFilterSlugs(
      product.category,
      typeValue,
      product.division,
    );
    if (matchingSlugs.includes(product.type)) return true;
  }

  return false;
}

/** Filter products by resolved catalogue filters (OR within group, AND across groups). */
export function filterProducts(
  products: Product[],
  filters: CatalogueSelectedFilters,
): Product[] {
  const categories = filters.category;
  const types = filters.type;

  if (!categories?.length && !types?.length) {
    return products;
  }

  return products.filter((product) => {
    if (categories?.length && !categories.includes(product.category)) {
      return false;
    }
    if (types?.length && !productMatchesTypeFilter(product, types)) {
      return false;
    }
    return true;
  });
}
