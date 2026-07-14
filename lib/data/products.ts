import {
  flattenTaxonomyTypes,
  getTaxonomyLabelBySlug,
  hydraulicTaxonomy,
} from "@/lib/data/taxonomy";
import type { Product, ProductDivision } from "@/lib/types/product.types";

/**
 * Seed products generated from the hydraulic taxonomy so every category is covered.
 * Names/types/makes come from WEBSITE_PLAN §6.2 — not invented SKUs.
 */
function buildHydraulicSeedProducts(): Product[] {
  const products: Product[] = [];
  let index = 1;

  for (const category of hydraulicTaxonomy) {
    const defaultBrand = category.makes[0];

    if (category.types.length === 0) {
      // e.g. motors — taxonomy lists makes + sizes, no types
      for (const make of category.makes) {
        products.push({
          id: `h-${index++}`,
          name: `${make} hydraulic motor`,
          division: "hydraulic",
          category: category.slug,
          brand: make,
        });
      }
      continue;
    }

    for (const type of flattenTaxonomyTypes(category.types)) {
      products.push({
        id: `h-${index++}`,
        name: type.label,
        division: "hydraulic",
        category: category.slug,
        ...(defaultBrand ? { brand: defaultBrand } : {}),
        type: type.slug,
      });
    }
  }

  return products;
}

const hydraulicProducts: Product[] = buildHydraulicSeedProducts();

export function getProductsForDivision(division?: ProductDivision): Product[] {
  if (division === "hydraulic") return hydraulicProducts;
  // Pneumatic: add when client delivers taxonomy (WEBSITE_PLAN §6.3)
  return hydraulicProducts;
}

export function getProductsForCategory(
  categorySlug: string,
  division: ProductDivision = "hydraulic",
): Product[] {
  return getProductsForDivision(division).filter(
    (product) => product.category === categorySlug,
  );
}

export function getProductById(id: string): Product | undefined {
  return getProductsForDivision().find((product) => product.id === id);
}

export function formatCategoryLabel(slug: string): string {
  const fromTaxonomy = getTaxonomyLabelBySlug(slug);
  if (fromTaxonomy) return fromTaxonomy;

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
