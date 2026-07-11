import type {
  HydraulicCategoryTaxonomy,
  TaxonomyTypeNode,
} from "@/lib/types/product.types";

/** Slugify taxonomy labels for URLs (e.g. "Direction control valve" → "direction-control-valve"). */
export function toTaxonomySlug(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function typeNode(label: string, children?: string[]): TaxonomyTypeNode {
  return {
    label,
    slug: toTaxonomySlug(label),
    ...(children
      ? { children: children.map((child) => typeNode(child)) }
      : {}),
  };
}

/**
 * Full hydraulic taxonomy — 13 categories from WEBSITE_PLAN §6.2 / §16.
 * Makes, types, subtypes, and sizes match the client brief; do not invent entries.
 */
export const hydraulicTaxonomy: HydraulicCategoryTaxonomy[] = [
  {
    slug: "pumps",
    name: "Pumps",
    makes: [
      "Yuken",
      "Vickers",
      "Rexroth",
      "Daikin",
      "Veljan",
      "THM Haude",
      "Nachi",
      "Eckerle",
      "Voith",
    ],
    types: [
      typeNode("Gear pump", ["Internal gear pump", "External gear pump"]),
      typeNode("Piston pump", ["Variable displacement piston pump"]),
      typeNode("Vane pump", ["Fixed vane pump", "Variable vane pump"]),
    ],
    copy: {
      title: "Hydraulic Pumps",
      intro:
        "Gear, piston, and vane pumps from leading hydraulic makes including Yuken, Vickers, Rexroth, and more.",
      seoBlurb:
        "Browse hydraulic pumps by type — gear, piston, and vane — and by make. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "valves",
    name: "Valves",
    makes: ["Yuken", "Vickers", "Rexroth", "Daikin", "THM Haude", "Nachi"],
    types: [
      typeNode("Direction control valve"),
      typeNode("Check valve"),
      typeNode("Pressure reducing valve"),
      typeNode("Non-return valve"),
      typeNode("Sequence valve"),
      typeNode("Balancing valve"),
      typeNode("Pressure switch"),
      typeNode("Pressure relief valve"),
    ],
    copy: {
      title: "Hydraulic Valves",
      intro:
        "Direction, pressure, check, sequence, and related hydraulic valves from Yuken, Vickers, Rexroth, and other listed makes.",
      seoBlurb:
        "Browse hydraulic valves including direction control, check, pressure reducing, relief, and related types. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "hoses",
    name: "Hoses",
    makes: ["Parker", "Gates", "Polyhose"],
    types: [
      typeNode("Low pressure"),
      typeNode("Medium pressure"),
      typeNode("High pressure"),
      typeNode("Jack hose"),
      typeNode("Spiral hose"),
      typeNode("Vacuum hose"),
      typeNode("Suction hose"),
      typeNode("Thermoplastic hose"),
      typeNode("Steam hose"),
      typeNode("Gas hose"),
      typeNode("Water hose"),
      typeNode("Carbon free hose"),
      typeNode("Teflon hose"),
      typeNode("SS bellow hose"),
    ],
    copy: {
      title: "Hydraulic Hoses",
      intro:
        "Low, medium, and high pressure hoses plus specialty lines from Parker, Gates, and Polyhose.",
      seoBlurb:
        "Browse hydraulic hoses by pressure rating and specialty type. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "fittings",
    name: "Fittings",
    makes: ["Parker", "Hydromatic", "Fitwell", "Hyfit", "Hyloc"],
    types: [
      typeNode("Elbow"),
      typeNode("Straight"),
      typeNode("Tee"),
      typeNode("Banjo"),
      typeNode("Union"),
      typeNode("Bulkhead"),
      typeNode("All swivel types"),
    ],
    sizes: ["Metric", "Inches", "BSW", "UNF"],
    copy: {
      title: "Hydraulic Fittings",
      intro:
        "Elbow, straight, tee, banjo, union, bulkhead, and swivel fittings in metric, inches, BSW, and UNF sizes.",
      seoBlurb:
        "Browse hydraulic fittings by type and thread size standard. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "cylinders",
    name: "Cylinders",
    makes: ["Parker Taiyo", "SMC", "Rishabh Hydro Tech"],
    types: [
      typeNode("Single acting"),
      typeNode("Double acting"),
      typeNode("SS magnetic cylinder with sensor"),
      typeNode("Telescopic cylinder"),
    ],
    sizes: ["Bore: 25–450 mm", "Stroke: 5–6000 mm"],
    copy: {
      title: "Hydraulic Cylinders",
      intro:
        "Single acting, double acting, telescopic, and SS magnetic cylinders — bore 25–450 mm, stroke 5–6000 mm.",
      seoBlurb:
        "Browse hydraulic cylinders by type and size range. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "power-packs",
    name: "Power packs",
    makes: ["Rishabh Hydro Tech Engineers"],
    types: [
      typeNode("AC driven (industrial consistent power)"),
      typeNode("DC driven (mobile battery operated)"),
      typeNode("High pressure heavy duty power pack"),
    ],
    copy: {
      title: "Hydraulic Power Packs",
      intro:
        "AC-driven industrial, DC-driven mobile, and high-pressure heavy-duty power packs from Rishabh Hydro Tech Engineers.",
      seoBlurb:
        "Browse custom and standard hydraulic power packs by drive type. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "motors",
    name: "Motors",
    makes: [
      "Danfoss",
      "THM Haude",
      "Entermote",
      "SAI",
      "Vickers",
      "Rexroth",
      "Eagle",
    ],
    types: [],
    sizes: ["100–3500 cc"],
    copy: {
      title: "Hydraulic Motors",
      intro:
        "Hydraulic motors from Danfoss, THM Haude, Entermote, SAI, Vickers, Rexroth, and Eagle — sizes 100–3500 cc.",
      seoBlurb:
        "Browse hydraulic motors by make and displacement range. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "accumulators",
    name: "Accumulators",
    makes: ["Hydac", "EPE", "Parker", "Oliver", "Rishabh Hydro Tech"],
    types: [typeNode("Diaphragm"), typeNode("Piston"), typeNode("Bladder")],
    sizes: ["1–50 litre"],
    copy: {
      title: "Hydraulic Accumulators",
      intro:
        "Diaphragm, piston, and bladder accumulators (1–50 litre) from Hydac, EPE, Parker, Oliver, and Rishabh Hydro Tech.",
      seoBlurb:
        "Browse hydraulic accumulators and charging kits by type and size. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "filters",
    name: "Filters",
    makes: [
      "Rexroth",
      "MP Filter",
      "Donaldson",
      "Hydac",
      "Hydroline",
      "Mahle",
    ],
    types: [
      typeNode("Pressure line"),
      typeNode("Suction"),
      typeNode("Return line"),
    ],
    sizes: ["3–250 micron"],
    copy: {
      title: "Hydraulic Filters",
      intro:
        "Pressure line, suction, and return line filters (3–250 micron) from Rexroth, MP Filter, Donaldson, Hydac, and more.",
      seoBlurb:
        "Browse hydraulic filters by line type and micron rating. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "seals",
    name: "Seals & O-rings",
    makes: [],
    types: [
      typeNode("Rod seal"),
      typeNode("Piston seal"),
      typeNode("Guide rings"),
      typeNode("O-ring kits"),
      typeNode("Mechanical seal"),
      typeNode("Oil seal"),
    ],
    copy: {
      title: "Seals & O-rings",
      intro:
        "Rod seals, piston seals, guide rings, O-ring kits, mechanical seals, and oil seals for hydraulic systems.",
      seoBlurb:
        "Browse hydraulic seals and O-rings by type. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "manifolds",
    name: "Manifolds & blocks",
    makes: [],
    types: [
      typeNode("Hydraulic valve manifolds"),
      typeNode("Custom manifolds"),
      typeNode("Control block"),
    ],
    copy: {
      title: "Manifolds & Blocks",
      intro:
        "Hydraulic valve manifolds, custom manifolds, and control blocks for hydraulic circuits.",
      seoBlurb:
        "Browse hydraulic manifolds and blocks by type. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "pressure-gauges",
    name: "Pressure gauges",
    makes: ["H-Guru", "Micro", "Wika", "Mass"],
    types: [
      typeNode("Analog glycerine filled"),
      typeNode("Digital pressure gauge"),
    ],
    sizes: ["Dial: 2.5–4 inches"],
    copy: {
      title: "Pressure Gauges",
      intro:
        "Analog glycerine-filled and digital pressure gauges from H-Guru, Micro, Wika, and Mass — dial sizes 2.5–4 inches.",
      seoBlurb:
        "Browse hydraulic pressure gauges by type and dial size. Placeholder SEO copy pending client category paragraphs.",
    },
  },
  {
    slug: "heat-exchangers",
    name: "Heat exchangers",
    makes: [],
    types: [
      typeNode("Air cooled hydraulic oil cooler"),
      typeNode("Water cooled hydraulic heat exchanger"),
    ],
    copy: {
      title: "Heat Exchangers",
      intro:
        "Air-cooled hydraulic oil coolers and water-cooled hydraulic heat exchangers.",
      seoBlurb:
        "Browse hydraulic heat exchangers by cooling type. Placeholder SEO copy pending client category paragraphs.",
    },
  },
];

const categoryBySlug = new Map(
  hydraulicTaxonomy.map((category) => [category.slug, category]),
);

export function getHydraulicCategory(
  slug: string,
): HydraulicCategoryTaxonomy | undefined {
  return categoryBySlug.get(slug);
}

export function getHydraulicCategorySlugs(): string[] {
  return hydraulicTaxonomy.map((category) => category.slug);
}

/** Resolve a display label for a category, type, or subtype slug from the taxonomy. */
export function getTaxonomyLabelBySlug(slug: string): string | undefined {
  const category = categoryBySlug.get(slug);
  if (category) return category.name;

  for (const cat of hydraulicTaxonomy) {
    for (const type of cat.types) {
      if (type.slug === slug) return type.label;
      for (const child of type.children ?? []) {
        if (child.slug === slug) return child.label;
      }
    }
  }

  return undefined;
}

/** Flatten type + subtype nodes under a category (depth-first). */
export function flattenTaxonomyTypes(
  types: TaxonomyTypeNode[],
): TaxonomyTypeNode[] {
  const result: TaxonomyTypeNode[] = [];
  for (const type of types) {
    result.push(type);
    if (type.children?.length) {
      result.push(...flattenTaxonomyTypes(type.children));
    }
  }
  return result;
}
