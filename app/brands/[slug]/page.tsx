import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CatalogueInquiryCTA } from "@/components/products/CatalogueInquiryCTA";
import { ProductGrid } from "@/components/products/ProductGrid";
import {
  getAllBrands,
  getBrandBySlug,
  getCategoriesForBrand,
} from "@/lib/data/brands";
import { getProductsForDivision } from "@/lib/data/products";
import { inquiryHref } from "@/lib/inquiry";

type BrandPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBrands().map((brand) => ({
    slug: brand.slug,
  }));
}

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: "Brand not found" };

  const categories = getCategoriesForBrand(brand.name);
  const categoryNames = categories.map((category) => category.name);
  const divisionLabel =
    brand.divisions.length === 2
      ? "Hydraulic & Pneumatic"
      : brand.divisions[0] === "pneumatic"
        ? "Pneumatic"
        : "Hydraulic";

  return {
    title: `${brand.name} ${divisionLabel} Products`,
    description:
      categoryNames.length > 0
        ? `${brand.name} products we deal in: ${categoryNames.join(", ")}. Request a best price quote.`
        : `${brand.name} catalogue products. Request a best price quote.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const categories = getCategoriesForBrand(brand.name);
  const products = getProductsForDivision().filter(
    (product) => product.brand === brand.name,
  );

  const divisionPhrase =
    brand.divisions.length === 2
      ? "hydraulic and pneumatic"
      : brand.divisions[0] === "pneumatic"
        ? "pneumatic"
        : "hydraulic";

  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Brands", href: "/brands" },
              { label: brand.name },
            ]}
            className="mb-4"
          />
          <p className="type-overline mb-2 text-brand">Brand</p>
          <h1 className="type-h1 text-balance text-neutral-dark">
            {brand.name}
          </h1>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            {categories.length > 0
              ? `Make listed for ${categories.length} ${divisionPhrase} ${categories.length === 1 ? "category" : "categories"}. Open a category to browse related products, or send an inquiry with the ${brand.name} model or part number you need.`
              : `Make listed in our ${divisionPhrase} range. Send an inquiry with the model or part number you need.`}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-10">
          {categories.length > 0 ? (
            <section aria-labelledby="brand-categories-heading">
              <h2
                id="brand-categories-heading"
                className="type-h3 text-neutral-dark"
              >
                Categories with {brand.name}
              </h2>
              <ul className="mt-4 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <li
                    key={`${category.division}-${category.slug}`}
                    className="bg-white"
                  >
                    <Link
                      href={`/products/${category.division}/${category.slug}`}
                      className="group flex h-full flex-col gap-2 px-4 py-5 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="type-h4 text-neutral-dark transition-colors group-hover:text-brand-dark">
                          {category.name}
                        </span>
                        <ArrowRightIcon
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                          aria-hidden
                        />
                      </span>
                      <span className="type-caption text-brand">
                        {category.division === "pneumatic"
                          ? "Pneumatic"
                          : "Hydraulic"}
                      </span>
                      <span className="type-body-sm line-clamp-2 text-muted-foreground">
                        {category.copy.intro}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {products.length > 0 ? (
            <section aria-labelledby="brand-products-heading">
              <h2
                id="brand-products-heading"
                className="type-h3 text-neutral-dark"
              >
                {brand.name} products
              </h2>
              <div className="mt-4">
                <ProductGrid products={products} />
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <CatalogueInquiryCTA
        cta={{
          title: `Get Best Price for ${brand.name}`,
          description:
            "Share the model number, type, and specs you need. We will reply with pricing and availability.",
          primaryLabel: "Get Best Price",
          href: inquiryHref({
            division: brand.divisions[0],
            brand: brand.name,
          }),
        }}
      />
    </div>
  );
}
