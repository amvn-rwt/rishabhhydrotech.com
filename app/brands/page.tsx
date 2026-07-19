import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CatalogueInquiryCTA } from "@/components/products/CatalogueInquiryCTA";
import { getAllBrands, getCategoriesForBrand } from "@/lib/data/brands";
import { inquiryHref } from "@/lib/inquiry";
import type { Brand } from "@/lib/types/product.types";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Hydraulic and pneumatic makes we deal in: Yuken, Rexroth, Festo, SMC, Parker, and more. Browse by brand and request a quote.",
  alternates: { canonical: "/brands" },
};

function groupByLetter(brands: Brand[]): [string, Brand[]][] {
  const groups = new Map<string, Brand[]>();
  for (const brand of brands) {
    const letter = brand.name.charAt(0).toUpperCase();
    const group = groups.get(letter);
    if (group) {
      group.push(brand);
    } else {
      groups.set(letter, [brand]);
    }
  }
  return [...groups.entries()].toSorted(([a], [b]) => a.localeCompare(b));
}

export default function BrandsPage() {
  const brands = getAllBrands();
  const letterGroups = groupByLetter(brands);

  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Brands" }]}
            className="mb-4"
          />
          <h1 className="type-h1 text-balance text-neutral-dark">
            Brands We Deal In
          </h1>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground tabular-nums">
            {brands.length} makes across hydraulic and pneumatic categories.
            Open a brand to see its categories and request a quote.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-8">
          {letterGroups.map(([letter, group]) => (
            <section key={letter} aria-labelledby={`brands-${letter}`}>
              <h2
                id={`brands-${letter}`}
                className="type-h3 text-neutral-dark"
              >
                {letter}
              </h2>
              <ul className="mt-3 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                {group.map((brand) => {
                  const categories = getCategoriesForBrand(brand.name);
                  return (
                    <li key={brand.slug} className="bg-white">
                      <Link
                        href={`/brands/${brand.slug}`}
                        className="group flex h-full flex-col gap-2 px-4 py-5 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="type-h4 text-neutral-dark transition-colors group-hover:text-brand-dark">
                            {brand.name}
                          </span>
                          <ArrowRightIcon
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                            aria-hidden
                          />
                        </span>
                        {categories.length > 0 ? (
                          <span className="type-caption line-clamp-1 text-neutral-mid">
                            {categories
                              .map((category) => category.name)
                              .join(", ")}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <CatalogueInquiryCTA
        cta={{
          title: "Get Best Price by Brand",
          description:
            "Tell us the make, model number, and specs. We will reply with pricing and availability.",
          primaryLabel: "Get Best Price",
          href: inquiryHref(),
        }}
      />
    </div>
  );
}
