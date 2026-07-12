import type { CataloguePageConfig, ProductDivision } from "@/lib/types/product.types";
import {
  filterProducts,
  resolveCatalogueFilters,
  type CatalogueSearchParams,
} from "@/lib/data/filter-params";
import { getFiltersForDivision } from "@/lib/data/filters";
import { formatCategoryLabel, getProductsForDivision } from "@/lib/data/products";
import { getHydraulicCategory, getTaxonomyLabelBySlug } from "@/lib/data/taxonomy";

type BuildCatalogueConfigOptions = {
  division?: ProductDivision;
  slug?: string[];
  searchParams?: CatalogueSearchParams;
};

const divisionMeta: Record<
  ProductDivision,
  { title: string; description: string }
> = {
  hydraulic: {
    title: "Hydraulic Products",
    description:
      "Browse pumps, valves, hoses, cylinders, power packs, and the full hydraulic range from leading brands.",
  },
};

export function buildCatalogueConfig({
  division,
  slug,
  searchParams,
}: BuildCatalogueConfigOptions): CataloguePageConfig {
  const allProducts = getProductsForDivision(division);
  const filters = getFiltersForDivision(division);

  const breadcrumbs: CataloguePageConfig["breadcrumbs"] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  let title = "Product Catalogue";
  let description =
    "Browse our hydraulic product range. Use filters to narrow by category, brand, or type.";

  const pathScope: { category?: string; typeSlugs?: string[] } = {};

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
    pathScope.category = categorySlug;

    const category = getHydraulicCategory(categorySlug);
    const categoryLabel =
      category?.name ?? formatCategoryLabel(categorySlug);

    breadcrumbs.push({
      label: categoryLabel,
      href: `/products/${division}/${categorySlug}`,
    });

    if (category) {
      title = category.copy.title;
      description = category.copy.intro;
    } else {
      title = `${categoryLabel}: ${divisionMeta[division].title}`;
      description = `Browse ${categoryLabel.toLowerCase()} in our ${division} product catalogue.`;
    }

    if (slug.length > 1) {
      const typeSlugs = slug.slice(1);
      pathScope.typeSlugs = typeSlugs;
      const leafSlug = typeSlugs[typeSlugs.length - 1];
      const typeLabel =
        getTaxonomyLabelBySlug(leafSlug) ?? formatCategoryLabel(leafSlug);
      breadcrumbs.push({ label: typeLabel });
      title = typeLabel;
      description = category
        ? `${category.copy.intro} Filtered to ${typeLabel.toLowerCase()}.`
        : `Browse ${typeLabel.toLowerCase()} products. Filter by brand and specifications.`;
    }
  }

  const { selectedFilters, lockedFilterIds, productsFilter } =
    resolveCatalogueFilters({ pathScope, searchParams });

  const locked = new Set<string>(lockedFilterIds);
  const visibleFilters = filters.filter((group) => !locked.has(group.id));

  const products = filterProducts(allProducts, productsFilter);

  return {
    title,
    description,
    breadcrumbs,
    filters: visibleFilters,
    selectedFilters,
    lockedFilterIds,
    products,
  };
}
