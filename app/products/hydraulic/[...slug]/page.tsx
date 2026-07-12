import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { CatalogueSkeleton } from "@/components/products/CatalogueSkeleton";
import { buildCatalogueConfig } from "@/lib/data/catalogue";
import { formatCategoryLabel } from "@/lib/data/products";
import {
  getAllHydraulicCatalogueSlugPaths,
  getHydraulicCategory,
  getTaxonomyLabelBySlug,
} from "@/lib/data/taxonomy";

type HydraulicCategoryPageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
  return getAllHydraulicCatalogueSlugPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: HydraulicCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] ? getHydraulicCategory(slug[0]) : undefined;
  const leafSlug = slug[slug.length - 1];
  const label =
    (slug.length > 1
      ? getTaxonomyLabelBySlug(leafSlug)
      : category?.name) ??
    (leafSlug ? formatCategoryLabel(leafSlug) : "Hydraulic Products");

  const titleBase =
    slug.length === 1 && category
      ? category.copy.title
      : `${label} | Hydraulic Products`;

  const description =
    slug.length === 1 && category
      ? category.copy.intro
      : `Browse ${label.toLowerCase()} in our hydraulic product catalogue.`;

  return {
    title: titleBase,
    description,
  };
}

function isValidHydraulicSlug(slug: string[]): boolean {
  if (slug.length === 0) return false;

  const category = getHydraulicCategory(slug[0]);
  if (!category) return false;
  if (slug.length === 1) return true;

  let siblings = category.types;
  for (let index = 1; index < slug.length; index += 1) {
    const node = siblings.find((entry) => entry.slug === slug[index]);
    if (!node) return false;
    siblings = node.children ?? [];
  }

  return true;
}

async function HydraulicCategoryPageContent({
  params,
  searchParams,
}: HydraulicCategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  if (!isValidHydraulicSlug(slug)) {
    notFound();
  }

  const config = buildCatalogueConfig({
    division: "hydraulic",
    slug,
    searchParams: query,
  });

  return <CatalogueLayout config={config} />;
}

export default function HydraulicCategoryPage(
  props: HydraulicCategoryPageProps,
) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <HydraulicCategoryPageContent {...props} />
    </Suspense>
  );
}
