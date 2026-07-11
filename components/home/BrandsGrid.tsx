import Link from "next/link";
import Image from "next/image";

import { getHomepageBrands } from "@/lib/data/home";

export function BrandsGrid() {
  const brands = getHomepageBrands();

  return (
    <section
      aria-labelledby="home-brands-heading"
      className="border-b border-border bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="type-overline mb-2 text-brand">OEM partners</p>
          <h2
            id="home-brands-heading"
            className="type-h2 text-balance text-neutral-dark"
          >
            Brands we deal in
          </h2>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            Leading hydraulic makes stocked and sourced for industrial buyers.
            Brand logos will appear here once usage assets are confirmed.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {brands.map((brand) => (
            <li key={brand.slug} className="bg-white">
              <Link
                href={`/brands/${brand.slug}`}
                className="group flex min-h-24 items-center justify-center px-4 py-6 grayscale transition-[filter,background-color] duration-200 hover:bg-brand-muted/50 hover:grayscale-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
              >
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={120}
                    height={48}
                    className="h-10 w-auto max-w-full object-contain opacity-80 transition-opacity group-hover:opacity-100"
                  />
                ) : (
                  <span className="type-h4 text-center tracking-wide text-neutral-dark/70 transition-colors group-hover:text-brand-dark">
                    {brand.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6">
          <Link
            href="/brands"
            className="type-body-sm font-semibold text-brand transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            View all brands
          </Link>
        </p>
      </div>
    </section>
  );
}
