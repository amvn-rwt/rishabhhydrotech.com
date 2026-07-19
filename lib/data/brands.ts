import {
  hydraulicTaxonomy,
  pneumaticTaxonomy,
  toTaxonomySlug,
} from "@/lib/data/taxonomy";
import type {
  Brand,
  CategoryTaxonomy,
  ProductDivision,
} from "@/lib/types/product.types";

export type BrandCategoryLink = CategoryTaxonomy & {
  division: ProductDivision;
};

/**
 * Brand metadata derived from taxonomy makes (WEBSITE_PLAN §6.2 / §6.3).
 * `logo` is null until OEM logos arrive (WEBSITE_TODO §A.3).
 */
function collectBrands(): Brand[] {
  const divisionsByName = new Map<string, Set<ProductDivision>>();

  for (const category of hydraulicTaxonomy) {
    for (const make of category.makes) {
      const set = divisionsByName.get(make) ?? new Set<ProductDivision>();
      set.add("hydraulic");
      divisionsByName.set(make, set);
    }
  }

  for (const category of pneumaticTaxonomy) {
    for (const make of category.makes) {
      const set = divisionsByName.get(make) ?? new Set<ProductDivision>();
      set.add("pneumatic");
      divisionsByName.set(make, set);
    }
  }

  return [...divisionsByName.entries()]
    .toSorted(([a], [b]) => a.localeCompare(b))
    .map(([name, divisions]) => ({
      name,
      slug: toTaxonomySlug(name),
      logo: null,
      divisions: [...divisions].toSorted(),
    }));
}

export const brands: Brand[] = collectBrands();

const brandBySlug = new Map(brands.map((brand) => [brand.slug, brand]));
const brandByName = new Map(brands.map((brand) => [brand.name, brand]));

export function getBrandBySlug(slug: string): Brand | undefined {
  return brandBySlug.get(slug);
}

export function getBrandByName(name: string): Brand | undefined {
  return brandByName.get(name);
}

export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrandsForDivision(
  division: ProductDivision = "hydraulic",
): Brand[] {
  return brands.filter((brand) => brand.divisions.includes(division));
}

/** Categories (either division) that list this make. */
export function getCategoriesForBrand(
  brandName: string,
): BrandCategoryLink[] {
  const result: BrandCategoryLink[] = [];

  for (const category of hydraulicTaxonomy) {
    if (category.makes.includes(brandName)) {
      result.push({ ...category, division: "hydraulic" });
    }
  }

  for (const category of pneumaticTaxonomy) {
    if (category.makes.includes(brandName)) {
      result.push({ ...category, division: "pneumatic" });
    }
  }

  return result;
}
