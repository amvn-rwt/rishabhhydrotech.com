import { getBrandBySlug } from "@/lib/data/brands";
import { getProductsForDivision } from "@/lib/data/products";
import { hydraulicTaxonomy } from "@/lib/data/taxonomy";
import type { Brand, Product } from "@/lib/types/product.types";

/** Top hydraulic categories for homepage quick links (WEBSITE_PLAN §5). */
export const homepageCategorySlugs = [
  "pumps",
  "valves",
  "hoses",
  "fittings",
  "cylinders",
  "power-packs",
  "motors",
  "accumulators",
] as const;

export type HomepageCategoryLink = {
  slug: string;
  name: string;
  href: string;
  intro: string;
};

export function getHomepageCategories(): HomepageCategoryLink[] {
  return homepageCategorySlugs.flatMap((slug) => {
    const category = hydraulicTaxonomy.find((entry) => entry.slug === slug);
    if (!category) return [];
    return [
      {
        slug: category.slug,
        name: category.name,
        href: `/products/hydraulic/${category.slug}`,
        intro: category.copy.intro,
      },
    ];
  });
}

/**
 * Curated OEM brand slugs for the homepage grid.
 * Prefer recognisable makes; logos pending client deliverables (WEBSITE_TODO §A.3).
 */
export const homepageBrandSlugs = [
  "yuken",
  "rexroth",
  "vickers",
  "parker",
  "gates",
  "daikin",
  "nachi",
  "danfoss",
  "hydac",
  "polyhose",
  "donaldson",
  "wika",
] as const;

export function getHomepageBrands(): Brand[] {
  return homepageBrandSlugs.flatMap((slug) => {
    const brand = getBrandBySlug(slug);
    return brand ? [brand] : [];
  });
}

/** Featured product IDs curated from seed catalogue (one per major category). */
const featuredProductMatchers: {
  category: string;
  typeIncludes?: string;
}[] = [
  { category: "pumps", typeIncludes: "variable-displacement" },
  { category: "valves", typeIncludes: "direction-control" },
  { category: "hoses", typeIncludes: "high-pressure" },
  { category: "cylinders", typeIncludes: "double-acting" },
  { category: "power-packs", typeIncludes: "ac-driven" },
  { category: "motors" },
];

export function getFeaturedProducts(): Product[] {
  const products = getProductsForDivision("hydraulic");

  return featuredProductMatchers.flatMap((matcher) => {
    const match = products.find((product) => {
      if (product.category !== matcher.category) return false;
      if (!matcher.typeIncludes) return true;
      return product.type?.includes(matcher.typeIncludes) ?? false;
    });
    return match ? [match] : [];
  });
}

export const whyChooseUsItems = [
  {
    id: "stock",
    title: "Local stock & fast turnaround",
    description:
      "Hydraulic pumps, valves, hoses, and fittings ready for plant maintenance and procurement timelines.",
  },
  {
    id: "brands",
    title: "Trusted OEM brands",
    description:
      "Yuken, Rexroth, Parker, Vickers, and other listed makes — matched to your machine and duty cycle.",
  },
  {
    id: "experience",
    title: "Application-focused support",
    description:
      "Help selecting by make, type, and size so replacements and upgrades fit the first time.",
  },
  {
    id: "custom",
    title: "Custom fabrication",
    description:
      "Power packs, cylinders, and manifolds built for industrial and mobile hydraulic systems.",
  },
] as const;

/**
 * About snippet placeholder until the client delivers a full company description
 * (WEBSITE_TODO §A.2). Keep factual; avoid invented claims.
 */
export const aboutSnippet = {
  overline: "About us",
  title: "Hydraulic solutions for industrial buyers",
  paragraphs: [
    "Rishabh Hydro Tech Engineers supplies hydraulic components and systems for plant maintenance, procurement, and OEM applications — from pumps and valves to hoses, cylinders, and power packs.",
    "Browse by category and make, then request a quote for the exact type and size you need. Contact details and a fuller company story will appear here once confirmed.",
  ],
  ctaLabel: "Learn more",
  ctaHref: "/about",
} as const;

export const inquiryCta = {
  title: "Need a quote?",
  description:
    "Tell us the product, make, and specs — we will get back with pricing and availability.",
  primaryLabel: "Get Best Price",
  primaryHref: "/inquiry",
} as const;
