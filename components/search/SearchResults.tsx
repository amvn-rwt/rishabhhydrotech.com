import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import type {
  SearchEntryKind,
  SearchResult,
} from "@/lib/data/search-index";

const KIND_HEADINGS: Record<SearchEntryKind, string> = {
  category: "Categories",
  type: "Product types",
  brand: "Brands",
};

const KIND_ORDER: SearchEntryKind[] = ["category", "type", "brand"];

type SearchResultsProps = {
  results: SearchResult[];
};

export function SearchResults({ results }: SearchResultsProps) {
  const groups = KIND_ORDER.flatMap((kind) => {
    const entries = results.filter((result) => result.kind === kind);
    return entries.length > 0 ? [{ kind, entries }] : [];
  });

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section
          key={group.kind}
          aria-labelledby={`search-group-${group.kind}`}
        >
          <h2
            id={`search-group-${group.kind}`}
            className="type-h3 text-neutral-dark"
          >
            {KIND_HEADINGS[group.kind]}
          </h2>

          <ul className="mt-4 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {group.entries.map((entry) => (
              <li key={entry.href} className="bg-white">
                <Link
                  href={entry.href}
                  className="group flex h-full flex-col gap-2 px-4 py-5 transition-colors hover:bg-brand-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="type-h4 text-neutral-dark transition-colors group-hover:text-brand-dark">
                      {entry.title}
                    </span>
                    <ArrowRightIcon
                      className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                      aria-hidden
                    />
                  </span>
                  <span className="type-body-sm line-clamp-2 text-muted-foreground">
                    {entry.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
