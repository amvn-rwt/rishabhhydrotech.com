import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Hydraulic Products",
  description:
    "Browse hydraulic pumps, valves, hoses, cylinders, and power packs.",
};

type HydraulicProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HydraulicProductsPage({
  searchParams,
}: HydraulicProductsPageProps) {
  const params = await searchParams;
  const config = buildCatalogueConfig({
    division: "hydraulic",
    searchParams: params,
  });

  return <CatalogueLayout config={config} />;
}
