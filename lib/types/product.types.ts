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
