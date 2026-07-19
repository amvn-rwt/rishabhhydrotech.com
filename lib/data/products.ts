import {
  flattenTaxonomyTypes,
  getTaxonomyLabelBySlug,
  hydraulicTaxonomy,
  pneumaticTaxonomy,
  toTaxonomySlug,
} from "@/lib/data/taxonomy";
import type {
  CategoryTaxonomy,
  Product,
  ProductDivision,
} from "@/lib/types/product.types";

/**
 * Unique catalogue card image per product type (or motor brand).
 * Drop the PNG at `public/products/{category}/{slug}.png`.
 */
export function productImagePath(
  categorySlug: string,
  fileSlug: string,
): string {
  return `/products/${categorySlug}/${fileSlug}.png`;
}

function buildSeedProductsForTaxonomy({
  taxonomy,
  division,
  idPrefix,
  nameForMakeOnly,
}: {
  taxonomy: CategoryTaxonomy[];
  division: ProductDivision;
  idPrefix: string;
  nameForMakeOnly: (make: string, categoryName: string) => string;
}): Product[] {
  const products: Product[] = [];
  let index = 1;

  for (const category of taxonomy) {
    const defaultBrand = category.makes[0];

    if (category.types.length === 0) {
      for (const make of category.makes) {
        const fileSlug = toTaxonomySlug(make);
        products.push({
          id: `${idPrefix}-${index++}`,
          name: nameForMakeOnly(make, category.name),
          division,
          category: category.slug,
          brand: make,
          image: productImagePath(category.slug, fileSlug),
        });
      }
      continue;
    }

    for (const type of flattenTaxonomyTypes(category.types)) {
      products.push({
        id: `${idPrefix}-${index++}`,
        name: type.label,
        division,
        category: category.slug,
        ...(defaultBrand ? { brand: defaultBrand } : {}),
        type: type.slug,
        image: productImagePath(category.slug, type.slug),
      });
    }
  }

  return products;
}

/**
 * Seed products generated from the hydraulic taxonomy so every category is covered.
 * Names/types/makes come from WEBSITE_PLAN §6.2 — not invented SKUs.
 */
function buildHydraulicSeedProducts(): Product[] {
  return buildSeedProductsForTaxonomy({
    taxonomy: hydraulicTaxonomy,
    division: "hydraulic",
    idPrefix: "h",
    nameForMakeOnly: (make) => `${make} hydraulic motor`,
  });
}

/**
 * Seed products from the pneumatic taxonomy (WEBSITE_PLAN §6.3).
 */
function buildPneumaticSeedProducts(): Product[] {
  return buildSeedProductsForTaxonomy({
    taxonomy: pneumaticTaxonomy,
    division: "pneumatic",
    idPrefix: "p",
    nameForMakeOnly: (make, categoryName) => `${make} ${categoryName}`,
  });
}

const hydraulicProducts: Product[] = buildHydraulicSeedProducts();
const pneumaticProducts: Product[] = buildPneumaticSeedProducts();

export function getProductsForDivision(division?: ProductDivision): Product[] {
  if (division === "hydraulic") return hydraulicProducts;
  if (division === "pneumatic") return pneumaticProducts;
  return [...hydraulicProducts, ...pneumaticProducts];
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
