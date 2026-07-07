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
};

export type CataloguePageConfig = {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  filters: FilterGroup[];
  products: Product[];
};
