"use client";

import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/data/home";
import { formatCategoryLabel } from "@/lib/data/products";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section
      aria-labelledby="home-featured-heading"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="type-overline mb-2 text-brand">Featured range</p>
          <h2
            id="home-featured-heading"
            className="type-h2 text-balance text-neutral-dark"
          >
            Featured products
          </h2>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            A selection from our hydraulic catalogue. Request pricing with the
            category pre-filled for a faster quote.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white">
                <div
                  className="aspect-4/3 border-b border-border bg-brand-muted"
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col gap-3 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {product.brand ? (
                      <span className="type-caption font-medium text-brand">
                        {product.brand}
                      </span>
                    ) : null}
                    <span className="type-caption text-muted-foreground">
                      {formatCategoryLabel(product.category)}
                    </span>
                  </div>
                  <h3 className="type-h3 text-neutral-dark">{product.name}</h3>
                  <div className="mt-auto pt-2">
                    <InquiryModal
                      defaults={{
                        division: product.division,
                        category: product.category,
                        product: product.id,
                        brand: product.brand,
                      }}
                      title={`Inquiry: ${product.name}`}
                      triggerLabel="Inquiry"
                      trigger={
                        <Button className="bg-accent px-4 text-white hover:bg-accent-hover" />
                      }
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
