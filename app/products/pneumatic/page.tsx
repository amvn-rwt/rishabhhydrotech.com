import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Pneumatic Products",
  description:
    "Browse pneumatic cylinders, valves, FRL units, tubing, and fittings.",
};

export default function PneumaticProductsPage() {
  const config = buildCatalogueConfig({ division: "pneumatic" });

  return <CatalogueLayout config={config} />;
}
