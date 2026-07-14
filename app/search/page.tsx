import type { Metadata } from "next";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

import { SearchResults } from "@/components/search/SearchResults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { popularSearches, searchCatalogue } from "@/lib/data/search-index";
import { hydraulicTaxonomy } from "@/lib/data/taxonomy";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search hydraulic categories, product types, and brands in the Rishabh Hydro Tech Engineers catalogue.",
  robots: { index: false },
};

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0]?.trim() ?? "";
  return value?.trim() ?? "";
}

function PopularSearchChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {popularSearches.map((term) => (
        <Link
          key={term}
          href={`/search?q=${encodeURIComponent(term)}`}
          className="type-body-sm border border-border bg-white px-3 py-1.5 text-neutral-dark transition-colors hover:border-brand/40 hover:bg-brand-muted hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {term}
        </Link>
      ))}
    </div>
  );
}

function CategorySuggestions() {
  return (
    <nav aria-label="Browse categories">
      <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {hydraulicTaxonomy.map((category) => (
          <li key={category.slug} className="bg-white">
            <Link
              href={`/products/hydraulic/${category.slug}`}
              className="group flex h-full flex-col gap-1 px-4 py-4 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
            >
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
    </nav>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = firstParam(params.q);
  const results = query ? searchCatalogue(query) : [];
  const hasQuery = query.length > 0;
  const hasResults = results.length > 0;

  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <p className="type-overline mb-2 text-brand">Search</p>
          <h1 className="type-h1 text-balance text-neutral-dark">
            {hasQuery ? `Results for "${query}"` : "Search the catalogue"}
          </h1>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground tabular-nums">
            {hasQuery
              ? `${results.length} ${results.length === 1 ? "match" : "matches"} across categories, types, and brands.`
              : "Type a product, type, or make below, or start from a popular search."}
          </p>

          <form
            action="/search"
            method="get"
            role="search"
            className="relative mt-5 max-w-lg"
          >
            <label htmlFor="search-page-input" className="sr-only">
              Search products
            </label>
            <Input
              id="search-page-input"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search products..."
              autoComplete="off"
              className="h-10 border-border bg-white pr-10 text-neutral-dark placeholder:text-neutral-mid focus-visible:border-brand focus-visible:ring-brand/30"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-mid transition-colors hover:text-brand-dark focus-visible:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label="Submit search"
            >
              <SearchIcon className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {hasQuery && hasResults ? (
          <SearchResults results={results} />
        ) : (
          <div className="flex flex-col gap-8">
            {hasQuery ? (
              <div className="border border-border bg-white px-6 py-10 text-center">
                <p className="type-h3 text-neutral-dark">
                  No matches for &quot;{query}&quot;
                </p>
                <p className="mx-auto mt-2 max-w-prose type-body text-neutral-mid">
                  Try a category, type, or make name, or browse a category
                  below. If you have a part number or spec, send it with an
                  inquiry and we will match it.
                </p>
                <div className="mt-5">
                  <Button
                    render={<Link href="/inquiry" />}
                    nativeButton={false}
                    className="bg-brand text-white hover:bg-brand-dark"
                  >
                    Get Best Price
                  </Button>
                </div>
              </div>
            ) : null}

            <section aria-labelledby="search-popular-heading">
              <h2
                id="search-popular-heading"
                className="type-h3 text-neutral-dark"
              >
                Popular searches
              </h2>
              <div className="mt-4">
                <PopularSearchChips />
              </div>
            </section>

            <section aria-labelledby="search-categories-heading">
              <h2
                id="search-categories-heading"
                className="type-h3 text-neutral-dark"
              >
                Browse by category
              </h2>
              <div className="mt-4">
                <CategorySuggestions />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
