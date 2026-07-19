/** Catalogue divisions (WEBSITE_PLAN §6.2 hydraulic, §6.3 pneumatic). */
export type ProductDivision = "hydraulic" | "pneumatic";

export type FilterOption = {
  label: string;
  value: string;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
};

export type Product = {
  id: string;
  name: string;
  division: ProductDivision;
  category: string;
  brand?: string;
  type?: string;
  /**
   * Path under /public. Convention: `/products/{category}/{type-or-brand}.png`.
   * Optional until the file is added; ProductCard shows a placeholder if missing.
   */
  image?: string;
};

/** Card linking to a child category, type, or subtype on a catalogue landing. */
export type CatalogueLandingCard = {
  label: string;
  href: string;
  /** Optional supporting line (e.g. subtype list or category intro). */
  description?: string;
  productCount: number;
};

/** Subcategory / type navigation shown above the product grid on landings. */
export type CatalogueLanding = {
  heading: string;
  cards: CatalogueLandingCard[];
};

/** Link chip for related category cross-links on catalogue pages. */
export type CatalogueRelatedLink = {
  label: string;
  href: string;
};

/** Inquiry CTA band props for catalogue pages. */
export type CatalogueInquiryCta = {
  title: string;
  description: string;
  primaryLabel: string;
  href: string;
};

export type CataloguePageConfig = {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  filters: FilterGroup[];
  /** Filter values from the URL query (excludes path-locked groups). */
  selectedFilters: Partial<Record<string, string[]>>;
  /** Filter group ids fixed by the path (e.g. category on `/pumps`). */
  lockedFilterIds: string[];
  products: Product[];
  /** Present when the path has child categories/types to browse. */
  landing?: CatalogueLanding;
  /** Makes shown in the brands strip (category makes, or division brands on hubs). */
  brands?: Brand[];
  /** "Get Best Price for [category]" inquiry band. */
  inquiryCta: CatalogueInquiryCta;
  /** Sibling / peer category links at the bottom of the page. */
  relatedCategories?: CatalogueRelatedLink[];
  /** SEO body paragraphs (shown on category-level landings). */
  seoBody?: string[];
};

/** OEM / house brand metadata (WEBSITE_TODO §B.3). Logos pending client deliverables. */
export type Brand = {
  name: string;
  slug: string;
  logo: string | null;
  divisions: ProductDivision[];
};

/** Nested type / subtype node in the hydraulic taxonomy (WEBSITE_PLAN §6.2). */
export type TaxonomyTypeNode = {
  label: string;
  slug: string;
  children?: TaxonomyTypeNode[];
};

/** Category landing copy (title, intro, SEO body paragraphs). */
export type CategoryLandingCopy = {
  title: string;
  intro: string;
  /** SEO body paragraphs (target 150–300 words for major categories). */
  seoBody: string[];
};

/**
 * One catalogue category from the confirmed client taxonomy.
 * `sizes` holds discrete options or range strings exactly as listed in WEBSITE_PLAN.
 */
export type CategoryTaxonomy = {
  slug: string;
  name: string;
  makes: string[];
  types: TaxonomyTypeNode[];
  sizes?: string[];
  copy: CategoryLandingCopy;
};

export type HydraulicCategoryTaxonomy = CategoryTaxonomy;
export type PneumaticCategoryTaxonomy = CategoryTaxonomy;
