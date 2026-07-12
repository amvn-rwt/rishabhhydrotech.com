import type {
  Brand,
  CatalogueInquiryCta,
  CatalogueLanding,
  CatalogueLandingCard,
  CataloguePageConfig,
  CatalogueRelatedLink,
  Product,
  ProductDivision,
  TaxonomyTypeNode,
} from "@/lib/types/product.types";
import { getBrandByName, getBrandsForDivision } from "@/lib/data/brands";
import {
  filterProducts,
  resolveCatalogueFilters,
  type CatalogueSearchParams,
} from "@/lib/data/filter-params";
import { getFiltersForDivision } from "@/lib/data/filters";
import { inquiryHref } from "@/lib/inquiry";
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

function brandsFromMakeNames(makes: string[]): Brand[] {
  return makes.flatMap((name) => {
    const brand = getBrandByName(name);
    return brand ? [brand] : [];
  });
}

function buildCatalogueBrands({
  division,
  categorySlug,
}: {
  division?: ProductDivision;
  categorySlug?: string;
}): Brand[] | undefined {
  if (categorySlug) {
    const category = getHydraulicCategory(categorySlug);
    if (!category?.makes.length) return undefined;
    const brands = brandsFromMakeNames(category.makes);
    return brands.length > 0 ? brands : undefined;
  }

  const brands = getBrandsForDivision(division ?? "hydraulic");
  return brands.length > 0 ? brands : undefined;
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
  const label = categorySlug ? titleLabel : division ? divisionMeta[division].title : "Products";

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
  if (!categorySlug) return undefined;

  const resolvedDivision = division ?? "hydraulic";
  const related = hydraulicTaxonomy
    .filter((category) => category.slug !== categorySlug)
    .slice(0, RELATED_CATEGORY_LIMIT)
    .map((category) => ({
      label: category.name,
      href: `/products/${resolvedDivision}/${category.slug}`,
    }));

  return related.length > 0 ? related : undefined;
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
  const categorySlug = pathScope.category;
  const brands = buildCatalogueBrands({ division, categorySlug });
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
    ...(brands ? { brands } : {}),
    ...(relatedCategories ? { relatedCategories } : {}),
    ...(seoBody ? { seoBody } : {}),
  };
}
