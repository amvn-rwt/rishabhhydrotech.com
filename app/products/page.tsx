import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { CatalogueSkeleton } from "@/components/products/CatalogueSkeleton";
import { buildCatalogueConfig } from "@/lib/data/catalogue";

export const metadata: Metadata = {
  title: "Product Catalogue",
  description:
    "Browse hydraulic products: pumps, valves, hoses, cylinders, and more.",
};

type ProductsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function ProductsPageContent({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const config = buildCatalogueConfig({ searchParams: params });

  return <CatalogueLayout config={config} />;
}

export default function ProductsPage(props: ProductsPageProps) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <ProductsPageContent {...props} />
    </Suspense>
  );
}
