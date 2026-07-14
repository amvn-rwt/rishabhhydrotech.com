import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { CatalogueSkeleton } from "@/components/products/CatalogueSkeleton";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Hydraulic Products",
  description:
    "Browse hydraulic pumps, valves, hoses, cylinders, and power packs.",
  alternates: { canonical: "/products/hydraulic" },
};

type HydraulicProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HydraulicProductsPageContent({
  searchParams,
}: HydraulicProductsPageProps) {
  const params = await searchParams;
  const config = buildCatalogueConfig({
    division: "hydraulic",
    searchParams: params,
  });

  return <CatalogueLayout config={config} />;
}

export default function HydraulicProductsPage(
  props: HydraulicProductsPageProps,
) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <HydraulicProductsPageContent {...props} />
    </Suspense>
  );
}
