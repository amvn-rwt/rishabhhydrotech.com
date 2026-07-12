/**
 * Catalogue divisions. v1 ships hydraulic only.
 * Add `"pneumatic"` when the client delivers the pneumatic taxonomy (WEBSITE_PLAN §6.3).
 */
export type ProductDivision = "hydraulic";

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

/** Category landing copy placeholders (title, intro, SEO blurb). */
export type CategoryLandingCopy = {
  title: string;
  intro: string;
  seoBlurb: string;
};

/**
 * One hydraulic category from the confirmed client taxonomy.
 * `sizes` holds discrete options or range strings exactly as listed in WEBSITE_PLAN §6.2.
 */
export type HydraulicCategoryTaxonomy = {
  slug: string;
  name: string;
  makes: string[];
  types: TaxonomyTypeNode[];
  sizes?: string[];
  copy: CategoryLandingCopy;
};
