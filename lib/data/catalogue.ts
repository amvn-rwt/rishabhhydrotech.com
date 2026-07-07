import type { CataloguePageConfig, ProductDivision } from "@/lib/types/product.types";
import { getFiltersForDivision } from "@/lib/data/filters";
import { formatCategoryLabel, getProductsForDivision } from "@/lib/data/products";

type BuildCatalogueConfigOptions = {
  division?: ProductDivision;
  slug?: string[];
};

const divisionMeta: Record<
  ProductDivision,
  { title: string; description: string }
> = {
  hydraulic: {
    title: "Hydraulic Products",
    description:
      "Browse pumps, valves, hoses, cylinders, and power packs from leading hydraulic brands.",
  },
  pneumatic: {
    title: "Pneumatic Products",
    description:
      "Browse cylinders, valves, FRL units, tubing, and fittings for industrial pneumatic systems.",
  },
};

export function buildCatalogueConfig({
  division,
  slug,
}: BuildCatalogueConfigOptions): CataloguePageConfig {
  const products = getProductsForDivision(division);
  const filters = getFiltersForDivision(division);

  const breadcrumbs: CataloguePageConfig["breadcrumbs"] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  let title = "Product Catalogue";
  let description =
    "Browse our full range of hydraulic and pneumatic equipment. Use filters to narrow by category, brand, or type.";

  if (division) {
    breadcrumbs.push({
      label: divisionMeta[division].title,
      href: `/products/${division}`,
    });
    title = divisionMeta[division].title;
    description = divisionMeta[division].description;
  }

  if (division && slug && slug.length > 0) {
    const categorySlug = slug[0];
    const categoryLabel = formatCategoryLabel(categorySlug);

    breadcrumbs.push({
      label: categoryLabel,
      href: `/products/${division}/${categorySlug}`,
    });

    title = `${categoryLabel} — ${divisionMeta[division].title}`;
    description = `Browse ${categoryLabel.toLowerCase()} in our ${division} product catalogue.`;

    if (slug.length > 1) {
      const typeLabel = formatCategoryLabel(slug[slug.length - 1]);
      breadcrumbs.push({ label: typeLabel });
      title = typeLabel;
      description = `Browse ${typeLabel.toLowerCase()} products. Filter by brand and specifications.`;
    }
  }

  return {
    title,
    description,
    breadcrumbs,
    filters,
    products,
  };
}
