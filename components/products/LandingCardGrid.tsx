import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import type { CatalogueLanding } from "@/lib/types/product.types";

type LandingCardGridProps = {
  landing: CatalogueLanding;
};

export function LandingCardGrid({ landing }: LandingCardGridProps) {
  const headingId = "catalogue-landing-heading";

  return (
    <section aria-labelledby={headingId} className="mb-6">
      <h2 id={headingId} className="type-h3 text-neutral-dark">
        {landing.heading}
      </h2>

      <ul className="mt-4 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {landing.cards.map((card) => (
          <li key={card.href} className="bg-white">
            <Link
              href={card.href}
              className="group flex h-full flex-col gap-3 px-4 py-5 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="type-h4 text-neutral-dark transition-colors group-hover:text-brand-dark">
                  {card.label}
                </span>
                <ArrowRightIcon
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden
                />
              </span>

              {card.description ? (
                <span className="type-body-sm line-clamp-2 text-muted-foreground">
                  {card.description}
                </span>
              ) : null}

              <span className="type-caption mt-auto text-neutral-mid">
                {card.productCount}{" "}
                {card.productCount === 1 ? "product" : "products"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
