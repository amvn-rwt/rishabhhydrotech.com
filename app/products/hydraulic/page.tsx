import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Hydraulic Products",
  description:
    "Browse hydraulic pumps, valves, hoses, cylinders, and power packs.",
};

export default function HydraulicProductsPage() {
  const config = buildCatalogueConfig({ division: "hydraulic" });

  return <CatalogueLayout config={config} />;
}
