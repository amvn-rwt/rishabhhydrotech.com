import type { Metadata } from "next";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { buildCatalogueConfig } from "@/lib/data/catalogue";
import { formatCategoryLabel } from "@/lib/data/products";

type PneumaticCategoryPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: PneumaticCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const label = slug.length > 0 ? formatCategoryLabel(slug[slug.length - 1]) : "Pneumatic Products";

  return {
    title: `${label} — Pneumatic Products`,
    description: `Browse ${label.toLowerCase()} in our pneumatic product catalogue.`,
  };
}

export default async function PneumaticCategoryPage({
  params,
}: PneumaticCategoryPageProps) {
  const { slug } = await params;
  const config = buildCatalogueConfig({ division: "pneumatic", slug });

  return <CatalogueLayout config={config} />;
}
