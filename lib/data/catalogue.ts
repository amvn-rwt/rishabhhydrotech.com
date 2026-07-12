import type {
  CatalogueLanding,
  CatalogueLandingCard,
  CataloguePageConfig,
  Product,
  ProductDivision,
  TaxonomyTypeNode,
} from "@/lib/types/product.types";
import {
  filterProducts,
  resolveCatalogueFilters,
  type CatalogueSearchParams,
} from "@/lib/data/filter-params";
import { getFiltersForDivision } from "@/lib/data/filters";
import { formatCategoryLabel, getProductsForDivision } from "@/lib/data/products";
import {
  findTaxonomyTypeNode,
  getHydraulicCategory,
  getTaxonomyLabelBySlug,
  hydraulicTaxonomy,
} from "@/lib/data/taxonomy";

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

function countProductsForType(
  products: Product[],
  categorySlug: string | undefined,
  typeSlug: string,
): number {
  return filterProducts(products, {
    ...(categorySlug ? { category: [categorySlug] } : {}),
    type: [typeSlug],
  }).length;
}

function typeCardsFromNodes({
  types,
  hrefBase,
  products,
  categorySlug,
}: {
  types: TaxonomyTypeNode[];
  hrefBase: string;
  products: Product[];
  categorySlug: string;
}): CatalogueLandingCard[] {
  return types.map((type) => {
    const childLabels = type.children?.map((child) => child.label) ?? [];
    return {
      label: type.label,
      href: `${hrefBase}/${type.slug}`,
      ...(childLabels.length > 0
        ? { description: childLabels.join(", ") }
        : {}),
      productCount: countProductsForType(products, categorySlug, type.slug),
    };
  });
}

/**
 * Build landing cards for hub / category / type levels.
 * Hub → categories; category → types; type with children → subtypes.
 */
function buildCatalogueLanding({
  division,
  slug,
  products,
}: {
  division?: ProductDivision;
  slug?: string[];
  products: Product[];
}): CatalogueLanding | undefined {
  const resolvedDivision = division ?? "hydraulic";

  // Category or deeper path
  if (slug && slug.length > 0) {
    const categorySlug = slug[0];
    const category = getHydraulicCategory(categorySlug);
    if (!category) return undefined;

    // Category level: type cards
    if (slug.length === 1) {
      if (category.types.length === 0) return undefined;
      return {
        heading: "Browse by type",
        cards: typeCardsFromNodes({
          types: category.types,
          hrefBase: `/products/${resolvedDivision}/${category.slug}`,
          products,
          categorySlug: category.slug,
        }),
      };
    }

    // Type / subtype level: show children of the leaf node when present
    const leafSlug = slug[slug.length - 1];
    const node = findTaxonomyTypeNode(category.types, leafSlug);
    if (!node?.children?.length) return undefined;

    return {
      heading: "Browse by type",
      cards: typeCardsFromNodes({
        types: node.children,
        hrefBase: `/products/${resolvedDivision}/${slug.join("/")}`,
        products,
        categorySlug: category.slug,
      }),
    };
  }

  // Division or catalogue hub: category cards
  const cards: CatalogueLandingCard[] = hydraulicTaxonomy.map((category) => ({
    label: category.name,
    href: `/products/hydraulic/${category.slug}`,
    description: category.copy.intro,
    productCount: products.filter((product) => product.category === category.slug)
      .length,
  }));

  return {
    heading: "Browse by category",
    cards,
  };
}

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
  const landing = buildCatalogueLanding({ division, slug, products });

  return {
    title,
    description,
    breadcrumbs,
    filters: visibleFilters,
    selectedFilters,
    lockedFilterIds,
    products,
    ...(landing ? { landing } : {}),
  };
}
