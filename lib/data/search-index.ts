import { brands } from "@/lib/data/brands";
import {
  hydraulicTaxonomy,
} from "@/lib/data/taxonomy";
import type { TaxonomyTypeNode } from "@/lib/types/product.types";

export type SearchEntryKind = "category" | "type" | "brand";

export type SearchEntry = {
  kind: SearchEntryKind;
  title: string;
  description: string;
  href: string;
  /** Lowercased terms matched at lower weight than the title. */
  keywords: string[];
};

export type SearchResult = SearchEntry & { score: number };

/** Suggested queries for the empty state and no-results state. */
export const popularSearches = [
  "Rexroth pump",
  "Parker hose",
  "Hydraulic cylinder",
  "Yuken valve",
  "Power pack",
  "Pressure gauge",
] as const;

function walkTypeEntries(
  nodes: TaxonomyTypeNode[],
  hrefBase: string,
  categoryName: string,
  categoryKeywords: string[],
  out: SearchEntry[],
) {
  for (const node of nodes) {
    const href = `${hrefBase}/${node.slug}`;
    out.push({
      kind: "type",
      title: node.label,
      description: `Type in the ${categoryName} category.`,
      href,
      keywords: [categoryName.toLowerCase(), ...categoryKeywords],
    });
    if (node.children?.length) {
      walkTypeEntries(node.children, href, categoryName, categoryKeywords, out);
    }
  }
}

function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const category of hydraulicTaxonomy) {
    const makeKeywords = category.makes.map((make) => make.toLowerCase());
    const typeKeywords = category.types.map((type) => type.label.toLowerCase());

    entries.push({
      kind: "category",
      title: category.copy.title,
      description: category.copy.intro,
      href: `/products/hydraulic/${category.slug}`,
      keywords: [
        category.name.toLowerCase(),
        "hydraulic",
        ...makeKeywords,
        ...typeKeywords,
      ],
    });

    walkTypeEntries(
      category.types,
      `/products/hydraulic/${category.slug}`,
      category.name,
      makeKeywords,
      entries,
    );
  }

  for (const brand of brands) {
    const categoryNames = hydraulicTaxonomy
      .filter((category) => category.makes.includes(brand.name))
      .map((category) => category.name);

    entries.push({
      kind: "brand",
      title: brand.name,
      description:
        categoryNames.length > 0
          ? `Make listed for: ${categoryNames.join(", ")}.`
          : "Make listed in the hydraulic catalogue.",
      href: `/brands/${brand.slug}`,
      keywords: [
        "brand",
        "make",
        ...categoryNames.map((name) => name.toLowerCase()),
      ],
    });
  }

  return entries;
}

let cachedIndex: SearchEntry[] | null = null;

export function getSearchIndex(): SearchEntry[] {
  cachedIndex ??= buildSearchIndex();
  return cachedIndex;
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

const MAX_RESULTS = 30;

/**
 * Rank index entries against a free-text query.
 * Title matches outweigh keyword matches; every token must match somewhere.
 */
export function searchCatalogue(query: string): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const normalizedQuery = tokens.join(" ");
  const results: SearchResult[] = [];

  for (const entry of getSearchIndex()) {
    const title = entry.title.toLowerCase();
    const titleTokens = tokenize(entry.title);
    let score = 0;
    let allTokensMatch = true;

    for (const token of tokens) {
      const inTitle =
        titleTokens.includes(token) ||
        titleTokens.some((word) => word.startsWith(token));
      const inKeywords = entry.keywords.some(
        (keyword) => keyword === token || keyword.includes(token),
      );

      if (inTitle) {
        score += titleTokens.includes(token) ? 20 : 12;
      } else if (inKeywords) {
        score += 5;
      } else {
        allTokensMatch = false;
        break;
      }
    }

    if (!allTokensMatch || score === 0) continue;

    if (title === normalizedQuery) score += 100;
    else if (title.includes(normalizedQuery)) score += 40;

    results.push({ ...entry, score });
  }

  return results
    .toSorted((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, MAX_RESULTS);
}
