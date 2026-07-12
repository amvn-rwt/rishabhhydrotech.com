import Link from "next/link";

import type { CatalogueRelatedLink } from "@/lib/types/product.types";

type RelatedCategoriesProps = {
  categories: CatalogueRelatedLink[];
};

export function RelatedCategories({ categories }: RelatedCategoriesProps) {
  if (categories.length === 0) return null;

  const headingId = "catalogue-related-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="border-t border-border bg-brand-muted"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 id={headingId} className="type-h3 text-neutral-dark">
          Related categories
        </h2>

        <ul className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <li key={category.href}>
              <Link
                href={category.href}
                className="type-body-sm inline-flex border border-border bg-white px-3 py-2 font-medium text-neutral-dark transition-colors hover:border-brand hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
