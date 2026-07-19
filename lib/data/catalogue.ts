import type {
  CatalogueInquiryCta,
  CatalogueLanding,
  CatalogueLandingCard,
  CataloguePageConfig,
  CatalogueRelatedLink,
  Product,
  ProductDivision,
  TaxonomyTypeNode,
} from "@/lib/types/product.types";
import {
  filterProducts,
  resolveCatalogueFilters,
  type CatalogueSearchParams,
} from "@/lib/data/filter-params";
import { getFiltersForCatalogue } from "@/lib/data/filters";
import { inquiryHref } from "@/lib/inquiry";
import { formatCategoryLabel, getProductsForDivision } from "@/lib/data/products";
import {
  findTaxonomyTypeNode,
  getCategoryForDivision,
  getTaxonomyForDivision,
  getTaxonomyLabelBySlug,
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
  pneumatic: {
    title: "Pneumatic Products",
    description:
      "Browse air preparation, cylinders, valves, fittings, tubing, tools, and the full pneumatic range from leading brands.",
  },
};

const RELATED_CATEGORY_LIMIT = 8;

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
 * Hub → divisions; division → categories; category → types; type with children → subtypes.
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
  // Category or deeper path
  if (division && slug && slug.length > 0) {
    const categorySlug = slug[0];
    const category = getCategoryForDivision(division, categorySlug);
    if (!category) return undefined;

    // Category level: type cards
    if (slug.length === 1) {
      if (category.types.length === 0) return undefined;
      return {
        heading: "Browse by type",
        cards: typeCardsFromNodes({
          types: category.types,
          hrefBase: `/products/${division}/${category.slug}`,
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
        hrefBase: `/products/${division}/${slug.join("/")}`,
        products,
        categorySlug: category.slug,
      }),
    };
  }

  // Division landing: category cards
  if (division) {
    const taxonomy = getTaxonomyForDivision(division);
    const cards: CatalogueLandingCard[] = taxonomy.map((category) => ({
      label: category.name,
      href: `/products/${division}/${category.slug}`,
      description: category.copy.intro,
      productCount: products.filter(
        (product) => product.category === category.slug,
      ).length,
    }));

    return {
      heading: "Browse by category",
      cards,
    };
  }

  // Catalogue hub: division cards
  const cards: CatalogueLandingCard[] = (
    ["hydraulic", "pneumatic"] as const
  ).map((div) => ({
    label: divisionMeta[div].title,
    href: `/products/${div}`,
    description: divisionMeta[div].description,
    productCount: getProductsForDivision(div).length,
  }));

  return {
    heading: "Browse by division",
    cards,
  };
}

function buildCatalogueInquiryCta({
  division,
  categorySlug,
  titleLabel,
}: {
  division?: ProductDivision;
  categorySlug?: string;
  titleLabel: string;
}): CatalogueInquiryCta {
  const label = categorySlug
    ? titleLabel
    : division
      ? divisionMeta[division].title
      : "Products";

  return {
    title: `Get Best Price for ${label}`,
    description:
      "Share the make, type, and specs you need. We will reply with pricing and availability.",
    primaryLabel: "Get Best Price",
    href: inquiryHref({
      ...(division ? { division } : {}),
      ...(categorySlug ? { category: categorySlug } : {}),
    }),
  };
}

function buildRelatedCategories({
  division,
  categorySlug,
}: {
  division?: ProductDivision;
  categorySlug?: string;
}): CatalogueRelatedLink[] | undefined {
  if (!categorySlug || !division) return undefined;

  const related = getTaxonomyForDivision(division)
    .filter((category) => category.slug !== categorySlug)
    .slice(0, RELATED_CATEGORY_LIMIT)
    .map((category) => ({
      label: category.name,
      href: `/products/${division}/${category.slug}`,
    }));

  return related.length > 0 ? related : undefined;
}

export function buildCatalogueConfig({
  division,
  slug,
  searchParams,
}: BuildCatalogueConfigOptions): CataloguePageConfig {
  const allProducts = getProductsForDivision(division);

  const breadcrumbs: CataloguePageConfig["breadcrumbs"] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  let title = "Product Catalogue";
  let description =
    "Browse our hydraulic and pneumatic product range. Use filters to narrow by category or type.";

  const pathScope: { category?: string; typeSlugs?: string[] } = {};
  let seoBody: string[] | undefined;

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

    const category = getCategoryForDivision(division, categorySlug);
    const categoryLabel =
      category?.name ?? formatCategoryLabel(categorySlug);

    breadcrumbs.push({
      label: categoryLabel,
      href: `/products/${division}/${categorySlug}`,
    });

    if (category) {
      title = category.copy.title;
      description = category.copy.intro;
      // SEO body on category landings; type pages keep the category intro only.
      if (slug.length === 1) {
        seoBody = category.copy.seoBody;
      }
    } else {
      title = `${categoryLabel}: ${divisionMeta[division].title}`;
      description = `Browse ${categoryLabel.toLowerCase()} in our ${division} product catalogue.`;
    }

    if (slug.length > 1) {
      const typeSlugs = slug.slice(1);
      pathScope.typeSlugs = typeSlugs;
      const leafSlug = typeSlugs[typeSlugs.length - 1];
      const typeLabel =
        getTaxonomyLabelBySlug(leafSlug, division) ??
        formatCategoryLabel(leafSlug);
      breadcrumbs.push({ label: typeLabel });
      title = typeLabel;
      description = category
        ? `${category.copy.intro} Filtered to ${typeLabel.toLowerCase()}.`
        : `Browse ${typeLabel.toLowerCase()} products. Filter by type and specifications.`;
    }
  }

  const filters = getFiltersForCatalogue({
    division,
    categorySlug: pathScope.category,
  });

  const { selectedFilters, lockedFilterIds, productsFilter } =
    resolveCatalogueFilters({ pathScope, searchParams });

  const locked = new Set<string>(lockedFilterIds);
  const visibleFilters = filters.filter((group) => !locked.has(group.id));

  const products = filterProducts(allProducts, productsFilter);
  const landing = buildCatalogueLanding({ division, slug, products });
  const categorySlug = pathScope.category;
  const relatedCategories = buildRelatedCategories({ division, categorySlug });
  const inquiryCta = buildCatalogueInquiryCta({
    division,
    categorySlug,
    titleLabel: title,
  });

  return {
    title,
    description,
    breadcrumbs,
    filters: visibleFilters,
    selectedFilters,
    lockedFilterIds,
    products,
    inquiryCta,
    ...(landing ? { landing } : {}),
    ...(relatedCategories ? { relatedCategories } : {}),
    ...(seoBody ? { seoBody } : {}),
  };
}
