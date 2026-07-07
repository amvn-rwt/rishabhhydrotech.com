import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";
import { formatCategoryLabel } from "@/lib/data/products";

type HydraulicCategoryPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: HydraulicCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = slug.length > 0 ? formatCategoryLabel(slug[slug.length - 1]) : "Hydraulic Products";

  return {
    title: `${label} — Hydraulic Products`,
    description: `Browse ${label.toLowerCase()} in our hydraulic product catalogue.`,
  };
}

export default async function HydraulicCategoryPage({
  params,
}: HydraulicCategoryPageProps) {
  const { slug } = await params;
  const config = buildCatalogueConfig({ division: "hydraulic", slug });

  return <CatalogueLayout config={config} />;
}
