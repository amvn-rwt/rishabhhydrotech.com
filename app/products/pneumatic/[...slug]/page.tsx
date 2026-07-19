import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogueLayout } from "@/components/products/CatalogueLayout";
import { CatalogueSkeleton } from "@/components/products/CatalogueSkeleton";
import { buildCatalogueConfig } from "@/lib/data/catalogue";
import { formatCategoryLabel } from "@/lib/data/products";
import {
  getAllPneumaticCatalogueSlugPaths,
  getPneumaticCategory,
  getTaxonomyLabelBySlug,
} from "@/lib/data/taxonomy";

type PneumaticCategoryPageProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
  return getAllPneumaticCatalogueSlugPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PneumaticCategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0] ? getPneumaticCategory(slug[0]) : undefined;
  const leafSlug = slug[slug.length - 1];
  const label =
    (slug.length > 1
      ? getTaxonomyLabelBySlug(leafSlug, "pneumatic")
      : category?.name) ??
    (leafSlug ? formatCategoryLabel(leafSlug) : "Pneumatic Products");

  const titleBase =
    slug.length === 1 && category
      ? category.copy.title
      : `${label} | Pneumatic Products`;

  const description =
    slug.length === 1 && category
      ? category.copy.intro
      : `Browse ${label.toLowerCase()} in our pneumatic product catalogue.`;

  return {
    title: titleBase,
    description,
    alternates: { canonical: `/products/pneumatic/${slug.join("/")}` },
  };
}

function isValidPneumaticSlug(slug: string[]): boolean {
  if (slug.length === 0) return false;

  const category = getPneumaticCategory(slug[0]);
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

async function PneumaticCategoryPageContent({
  params,
  searchParams,
}: PneumaticCategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);

  if (!isValidPneumaticSlug(slug)) {
    notFound();
  }

  const config = buildCatalogueConfig({
    division: "pneumatic",
    slug,
    searchParams: query,
  });

  return <CatalogueLayout config={config} />;
}

export default function PneumaticCategoryPage(
  props: PneumaticCategoryPageProps,
) {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <PneumaticCategoryPageContent {...props} />
    </Suspense>
  );
}
