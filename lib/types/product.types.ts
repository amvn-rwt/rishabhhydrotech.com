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

export type CataloguePageConfig = {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  filters: FilterGroup[];
  products: Product[];
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
