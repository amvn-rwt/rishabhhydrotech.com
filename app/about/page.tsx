import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheckIcon,
  FactoryIcon,
  PackageIcon,
  WrenchIcon,
} from "lucide-react";

import { InquiryCTA } from "@/components/home/InquiryCTA";
import { Button } from "@/components/ui/button";
import { aboutSnippet, whyChooseUsItems } from "@/lib/data/home";
import { siteConfig } from "@/lib/data/site";
import { hydraulicTaxonomy, pneumaticTaxonomy } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rishabh Hydro Tech Engineers supplies hydraulic and pneumatic components: pumps, valves, hoses, cylinders, fittings, and more for plant and OEM buyers.",
  alternates: { canonical: "/about" },
};

const icons = {
  stock: PackageIcon,
  brands: BadgeCheckIcon,
  experience: FactoryIcon,
  custom: WrenchIcon,
} as const;

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <p className="type-overline mb-2 text-brand">
            {aboutSnippet.overline}
          </p>
          <h1 className="type-h1 max-w-3xl text-balance text-neutral-dark">
            About {siteConfig.name}
          </h1>
          <div className="mt-4 flex max-w-prose flex-col gap-3">
            {aboutSnippet.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="type-lead text-pretty text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              render={<Link href="/products/hydraulic" />}
              nativeButton={false}
              className="bg-brand text-white hover:bg-brand-dark"
            >
              Browse catalogue
            </Button>
            <Button
              render={<Link href="/brands" />}
              nativeButton={false}
              variant="outline"
            >
              Brands we deal in
            </Button>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="about-why-heading"
        className="border-b border-border bg-surface"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <h2
            id="about-why-heading"
            className="type-h2 text-balance text-neutral-dark"
          >
            How we work
          </h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {whyChooseUsItems.map((item) => {
              const Icon = icons[item.id];
              return (
                <li key={item.id} className="flex flex-col gap-3">
                  <span className="flex size-10 items-center justify-center rounded-md bg-brand-muted text-brand-dark">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="type-h3 text-neutral-dark">{item.title}</h3>
                  <p className="type-body-sm text-pretty text-muted-foreground">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="about-range-heading"
        className="border-b border-border bg-white"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <h2
            id="about-range-heading"
            className="type-h2 text-balance text-neutral-dark"
          >
            What we supply
          </h2>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            {hydraulicTaxonomy.length} hydraulic and {pneumaticTaxonomy.length}{" "}
            pneumatic categories, from pumps and valves to air preparation and
            automation components.
          </p>
          <ul className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {hydraulicTaxonomy.map((category) => (
              <li key={`hydraulic-${category.slug}`} className="bg-white">
                <Link
                  href={`/products/hydraulic/${category.slug}`}
                  className="group flex h-full flex-col gap-1 px-4 py-4 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                >
                  <span className="type-caption text-brand">Hydraulic</span>
                  <span className="type-h4 text-neutral-dark transition-colors group-hover:text-brand-dark">
                    {category.name}
                  </span>
                  <span className="type-caption line-clamp-1 text-neutral-mid">
                    {category.copy.intro}
                  </span>
                </Link>
              </li>
            ))}
            {pneumaticTaxonomy.map((category) => (
              <li key={`pneumatic-${category.slug}`} className="bg-white">
                <Link
                  href={`/products/pneumatic/${category.slug}`}
                  className="group flex h-full flex-col gap-1 px-4 py-4 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                >
                  <span className="type-caption text-brand">Pneumatic</span>
                  <span className="type-h4 text-neutral-dark transition-colors group-hover:text-brand-dark">
                    {category.name}
                  </span>
                  <span className="type-caption line-clamp-1 text-neutral-mid">
                    {category.copy.intro}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InquiryCTA />
    </div>
  );
}
