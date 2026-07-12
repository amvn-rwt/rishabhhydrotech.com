import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";
import { formatCategoryLabel } from "@/lib/data/products";

type HydraulicCategoryPageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  params,
}: HydraulicCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const label =
    slug.length > 0
      ? formatCategoryLabel(slug[slug.length - 1])
      : "Hydraulic Products";

  return {
    title: `${label} — Hydraulic Products`,
    description: `Browse ${label.toLowerCase()} in our hydraulic product catalogue.`,
  };
}

export default async function HydraulicCategoryPage({
  params,
  searchParams,
}: HydraulicCategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const config = buildCatalogueConfig({
    division: "hydraulic",
    slug,
    searchParams: query,
  });

  return <CatalogueLayout config={config} />;
}
