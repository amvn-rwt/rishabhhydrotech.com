import {
  BadgeCheckIcon,
  FactoryIcon,
  PackageIcon,
  WrenchIcon,
} from "lucide-react";

import { whyChooseUsItems } from "@/lib/data/home";

const icons = {
  stock: PackageIcon,
  brands: BadgeCheckIcon,
  experience: FactoryIcon,
  custom: WrenchIcon,
} as const;

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="home-why-heading"
      className="border-b border-border bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="type-overline mb-2 text-brand">Why choose us</p>
          <h2
            id="home-why-heading"
            className="type-h2 text-balance text-neutral-dark"
          >
            Built for industrial buyers
          </h2>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            Specs, brands, and local support for plant and OEM buyers.
          </p>
        </div>

        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
  );
}
