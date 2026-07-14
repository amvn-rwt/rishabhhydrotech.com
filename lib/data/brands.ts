import { hydraulicTaxonomy, toTaxonomySlug } from "@/lib/data/taxonomy";
import type {
  Brand,
  HydraulicCategoryTaxonomy,
} from "@/lib/types/product.types";

/**
 * Brand metadata derived from hydraulic taxonomy makes (WEBSITE_PLAN §6.2).
 * `logo` is null until OEM logos arrive (WEBSITE_TODO §A.3).
 * Divisions are hydraulic-only until pneumatic taxonomy is delivered (§6.3).
 */
function collectBrandNames(): string[] {
  const names = new Set<string>();
  for (const category of hydraulicTaxonomy) {
    for (const make of category.makes) {
      names.add(make);
    }
  }
  return [...names].toSorted((a, b) => a.localeCompare(b));
}

export const brands: Brand[] = collectBrandNames().map((name) => ({
  name,
  slug: toTaxonomySlug(name),
  logo: null,
  divisions: ["hydraulic"],
}));

const brandBySlug = new Map(brands.map((brand) => [brand.slug, brand]));
const brandByName = new Map(brands.map((brand) => [brand.name, brand]));

export function getBrandBySlug(slug: string): Brand | undefined {
  return brandBySlug.get(slug);
}

export function getBrandByName(name: string): Brand | undefined {
  return brandByName.get(name);
}

export function getBrandsForDivision(
  division: Brand["divisions"][number] = "hydraulic",
): Brand[] {
  return brands.filter((brand) => brand.divisions.includes(division));
}

/** Hydraulic categories that list this make (taxonomy `makes`). */
export function getCategoriesForBrand(
  brandName: string,
): HydraulicCategoryTaxonomy[] {
  return hydraulicTaxonomy.filter((category) =>
    category.makes.includes(brandName),
  );
}
