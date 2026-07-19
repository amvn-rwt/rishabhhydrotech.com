import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { CatalogueSkeleton } from "@/components/products/CatalogueSkeleton";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Pneumatic Products",
  description:
    "Browse air preparation, cylinders, valves, fittings, tubing, tools, and more.",
  alternates: { canonical: "/products/pneumatic" },
};

type PneumaticProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function PneumaticProductsPageContent({
  searchParams,
}: PneumaticProductsPageProps) {
  const params = await searchParams;
  const config = buildCatalogueConfig({
    division: "pneumatic",
    searchParams: params,
  });

  return <CatalogueLayout config={config} />;
}

export default function PneumaticProductsPage(
  props: PneumaticProductsPageProps,
) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <PneumaticProductsPageContent {...props} />
    </Suspense>
  );
}
