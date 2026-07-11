import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse hydraulic products — pumps, valves, hoses, cylinders, and more.",
};

export default function ProductsPage() {
  const config = buildCatalogueConfig({});

  return <CatalogueLayout config={config} />;
}
