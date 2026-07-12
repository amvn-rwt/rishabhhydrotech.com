import Link from "next/link";
import Image from "next/image";

import type { Brand } from "@/lib/types/product.types";

type CatalogueBrandsStripProps = {
  brands: Brand[];
  heading?: string;
};

export function CatalogueBrandsStrip({
  brands,
  heading = "Makes in this category",
}: CatalogueBrandsStripProps) {
  if (brands.length === 0) return null;

  const headingId = "catalogue-brands-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-border bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 id={headingId} className="type-h3 text-neutral-dark">
          {heading}
        </h2>

        <ul className="mt-4 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => (
            <li key={brand.slug} className="bg-white">
              <Link
                href={`/brands/${brand.slug}`}
                className="group flex min-h-20 items-center justify-center px-3 py-4 grayscale transition-[filter,background-color] duration-200 hover:bg-brand-muted/50 hover:grayscale-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={100}
                    height={40}
                    className="h-8 w-auto max-w-full object-contain opacity-80 transition-opacity group-hover:opacity-100"
                  />
                ) : (
                  <span className="type-body-sm text-center font-semibold tracking-wide text-neutral-dark/70 transition-colors group-hover:text-brand-dark">
                    {brand.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
