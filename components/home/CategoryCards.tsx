import Link from "next/link";
import {
  ArrowRightIcon,
  CableIcon,
  CircleDotIcon,
  CogIcon,
  CylinderIcon,
  FanIcon,
  GitBranchIcon,
  NutIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getHomepageCategories,
  homepageCategorySlugs,
} from "@/lib/data/home";

const categoryIcons: Record<(typeof homepageCategorySlugs)[number], LucideIcon> =
  {
    pumps: CogIcon,
    valves: GitBranchIcon,
    hoses: CableIcon,
    fittings: NutIcon,
    cylinders: CylinderIcon,
    "power-packs": ZapIcon,
    motors: FanIcon,
    accumulators: CircleDotIcon,
  };

export function CategoryCards() {
  const categories = getHomepageCategories();

  return (
    <section
      aria-labelledby="home-categories-heading"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="type-overline mb-2 text-brand">Browse catalogue</p>
            <h2
              id="home-categories-heading"
              className="type-h2 text-balance text-neutral-dark"
            >
              Hydraulic product categories
            </h2>
            <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
              Find pumps, valves, hoses, cylinders, and more by category.
            </p>
          </div>
          <Button
            render={<Link href="/products/hydraulic" />}
            nativeButton={false}
            size="lg"
            className="h-9 w-fit gap-0 overflow-hidden bg-brand p-0 text-white hover:bg-brand-dark"
          >
            <span className="px-5">View Hydraulic Catalogue</span>
            <span
              className="flex size-9 shrink-0 items-center justify-center border-l border-white/20 bg-brand-dark"
              aria-hidden
            >
              <ArrowRightIcon className="size-4" />
            </span>
          </Button>
        </div>

        <ul className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon =
              categoryIcons[
                category.slug as (typeof homepageCategorySlugs)[number]
              ];
            return (
              <li key={category.slug} className="bg-white">
                <Link
                  href={category.href}
                  className="group flex h-full flex-col gap-4 px-5 py-6 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                >
                  <span className="flex size-11 items-center justify-center bg-brand-muted text-brand-dark transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="flex items-center justify-between gap-3">
                      <span className="type-h3 text-neutral-dark transition-colors group-hover:text-brand-dark">
                        {category.name}
                      </span>
                      <ArrowRightIcon
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                        aria-hidden
                      />
                    </span>
                    <span className="type-body-sm line-clamp-2 text-muted-foreground">
                      {category.intro}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
