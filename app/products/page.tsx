import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse hydraulic products — pumps, valves, hoses, cylinders, and more.",
};

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const config = buildCatalogueConfig({ searchParams: params });

  return <CatalogueLayout config={config} />;
}
