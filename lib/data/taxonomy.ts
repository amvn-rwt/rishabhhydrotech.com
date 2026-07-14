import type {
  HydraulicCategoryTaxonomy,
  TaxonomyTypeNode,
} from "@/lib/types/product.types";
import { siteConfig } from "@/lib/data/site";

/** Own-brand make in catalogue filters. Same company as `siteConfig.name`. */
const HOUSE_BRAND = siteConfig.name;

/** Slugify taxonomy labels for URLs (e.g."Direction control valve" → "direction-control-valve"). */
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
      seoBody: [
        "Hydraulic pumps convert mechanical input into pressurised flow for industrial and mobile systems. Plant buyers and OEMs typically specify by pump type, displacement, pressure rating, and make so the unit matches the existing circuit and duty cycle.",
        "This catalogue covers gear pumps (internal and external), piston pumps including variable displacement designs, and vane pumps in fixed and variable configurations. Filter by make to compare Yuken, Vickers, Rexroth, Daikin, Veljan, THM Haude, Nachi, Eckerle, and Voith options side by side.",
        "Use the type cards above to open a gear, piston, or vane landing, then narrow with brand filters. When you have a model number, mounting style, or shaft detail from the machine plate, include it in your inquiry so we can quote the correct replacement or upgrade.",
        "Request a best price for hydraulic pumps with the make, type, and operating pressure you need. We supply for maintenance, retrofit, and new builds.",
      ],
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
      seoBody: [
        "Hydraulic valves direct flow, set pressure limits, and sequence actuators in industrial circuits. Correct valve selection depends on function (direction, relief, reducing, check, sequence, or balancing), port size, spool type, and OEM make.",
        "Browse direction control, check, non-return, pressure reducing, pressure relief, sequence, balancing valves, and pressure switches. Makes listed for this category include Yuken, Vickers, Rexroth, Daikin, THM Haude, and Nachi.",
        "Filter by brand and type to match manifold patterns and subplate standards already on the machine. For CETOP or modular stacks, note the size and interface in your quote request.",
        "Get a best price for hydraulic valves by sending the function, make preference, and any part number from the existing unit.",
      ],
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
      seoBody: [
        "Hydraulic hose assemblies carry pressurised fluid between pumps, valves, cylinders, and reservoirs. Specs usually include pressure class, ID, reinforcement (wire braid or spiral), cover compound, and end fittings.",
        "This range covers low, medium, and high pressure hose plus jack, spiral, vacuum, suction, thermoplastic, steam, gas, water, carbon-free, Teflon, and stainless bellow types. Makes include Parker, Gates, and Polyhose.",
        "Choose a pressure or specialty type above, then filter by brand. For replacements, share working pressure, hose ID, length, and fitting style so the assembly matches the line already on the plant.",
        "Request a quote for hydraulic hose by pressure rating, make, and fitting requirements.",
      ],
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
      seoBody: [
        "Hydraulic fittings connect hose and tube to pumps, valves, cylinders, and manifolds. Thread standard and geometry must match both ends of the connection to avoid leaks and damaged seats.",
        "Browse elbow, straight, tee, banjo, union, bulkhead, and swivel fittings. Size filters cover metric, inches, BSW, and UNF. Makes include Parker, Hydromatic, Fitwell, Hyfit, and Hyloc.",
        "Use type and brand filters to shortlist options, then confirm thread callout and sealing face (JIC, BSP, ORFS, and similar) in your inquiry.",
        "Get a best price for hydraulic fittings with the type, thread standard, and quantity you need.",
      ],
    },
  },
  {
    slug: "cylinders",
    name: "Cylinders",
    makes: ["Parker Taiyo", "SMC", HOUSE_BRAND],
    types: [
      typeNode("Single acting"),
      typeNode("Double acting"),
      typeNode("SS magnetic cylinder with sensor"),
      typeNode("Telescopic cylinder"),
    ],
    sizes: ["Bore: 25-450 mm", "Stroke: 5-6000 mm"],
    copy: {
      title: "Hydraulic Cylinders",
      intro:
        "Single acting, double acting, telescopic, and SS magnetic cylinders. Bore 25-450 mm, stroke 5-6000 mm.",
      seoBody: [
        "Hydraulic cylinders convert fluid pressure into linear force for presses, machine tools, mobile equipment, and plant actuators. Key dimensions are bore, stroke, rod diameter, mounting style, and whether the circuit needs single or double acting operation.",
        `This catalogue lists single acting, double acting, telescopic, and stainless magnetic cylinders with sensors. Bore coverage is 25-450 mm and stroke 5-6000 mm. Makes include Parker Taiyo, SMC, and ${HOUSE_BRAND}.`,
        "Open a type landing to filter products, then request a quote with bore, stroke, mounting, and port details. Custom builds are available when a standard catalogue size does not fit the machine envelope.",
        "Get a best price for hydraulic cylinders by sending bore, stroke, type, and any existing model reference.",
      ],
    },
  },
  {
    slug: "power-packs",
    name: "Power packs",
    makes: [HOUSE_BRAND],
    types: [
      typeNode("AC driven (industrial consistent power)"),
      typeNode("DC driven (mobile battery operated)"),
      typeNode("High pressure heavy duty power pack"),
    ],
    copy: {
      title: "Hydraulic Power Packs",
      intro:
        `AC-driven industrial, DC-driven mobile, and high-pressure heavy-duty power packs from ${HOUSE_BRAND}.`,
      seoBody: [
        "A hydraulic power pack combines pump, motor, reservoir, valves, and filtration into a self-contained unit that supplies pressurised oil to cylinders and motors. Buyers specify drive type, flow, pressure, tank size, and control options for the application.",
        `We list AC-driven packs for steady industrial supply, DC-driven packs for mobile or battery-powered duty, and high-pressure heavy-duty packs. Units are supplied under ${HOUSE_BRAND}.`,
        "Browse by drive type, then inquire with required pressure, flow, voltage, and duty cycle. Include valve and manifold preferences if the pack must drop into an existing skid or machine frame.",
        "Request a best price for a hydraulic power pack with drive type, pressure, and flow targets.",
      ],
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
    sizes: ["100-3500 cc"],
    copy: {
      title: "Hydraulic Motors",
      intro:
        "Hydraulic motors from Danfoss, THM Haude, Entermote, SAI, Vickers, Rexroth, and Eagle. Sizes 100-3500 cc.",
      seoBody: [
        "Hydraulic motors turn pressurised flow into rotary torque for conveyors, winches, drives, and mobile equipment. Selection usually starts with displacement (cc/rev), continuous and intermittent pressure, shaft style, and mounting.",
        "Displacement coverage here is 100-3500 cc across Danfoss, THM Haude, Entermote, SAI, Vickers, Rexroth, and Eagle. Filter by make to match the brand already on the machine or to evaluate alternatives in the same size class.",
        "Include displacement, shaft, and mounting details in your inquiry so we can quote a compatible motor.",
      ],
    },
  },
  {
    slug: "accumulators",
    name: "Accumulators",
    makes: ["Hydac", "EPE", "Parker", "Oliver", HOUSE_BRAND],
    types: [typeNode("Diaphragm"), typeNode("Piston"), typeNode("Bladder")],
    sizes: ["1-50 litre"],
    copy: {
      title: "Hydraulic Accumulators",
      intro:
        `Diaphragm, piston, and bladder accumulators (1-50 litre) from Hydac, EPE, Parker, Oliver, and ${HOUSE_BRAND}.`,
      seoBody: [
        "Hydraulic accumulators store energy as pressurised fluid for shock absorption, leakage compensation, and emergency backup. Type (diaphragm, piston, or bladder), gas precharge, and litre size must suit system pressure and response needs.",
        `Browse diaphragm, piston, and bladder units from 1-50 litre. Makes include Hydac, EPE, Parker, Oliver, and ${HOUSE_BRAND}. Filter by type and brand, then confirm volume and pressure rating in your quote request.`,
        "Get a best price for hydraulic accumulators with type, size, and working pressure.",
      ],
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
    sizes: ["3-250 micron"],
    copy: {
      title: "Hydraulic Filters",
      intro:
        "Pressure line, suction, and return line filters (3-250 micron) from Rexroth, MP Filter, Donaldson, Hydac, and more.",
      seoBody: [
        "Hydraulic filters protect pumps, valves, and actuators from particulate contamination. Choose by circuit location (suction, pressure, or return), micron rating, flow capacity, and housing style.",
        "This category covers pressure line, suction, and return line filters from 3-250 micron. Makes include Rexroth, MP Filter, Donaldson, Hydac, Hydroline, and Mahle.",
        "Filter by line type and brand, then inquire with micron rating, port size, and element part number if known.",
      ],
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
      seoBody: [
        "Hydraulic seals keep pressurised oil inside cylinders and rotating equipment while excluding contamination. Rod and piston seals, guide rings, O-ring kits, mechanical seals, and oil seals are selected by groove dimensions, material, and duty.",
        "Browse by seal type above. For replacements, share groove sizes, material preference (for example NBR or polyurethane), and the cylinder or pump model so we can match the correct profile.",
        "Request a quote for seals and O-rings with type, size, and quantity.",
      ],
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
      seoBody: [
        "Manifolds and control blocks mount valves and route oil between pumps, actuators, and tanks in a compact circuit package. Standard valve manifolds and custom-machined blocks are both used depending on space and circuit complexity.",
        "Browse hydraulic valve manifolds, custom manifolds, and control blocks. For custom work, send a circuit sketch, port sizes, and valve interface so we can quote machining and assembly.",
        "Get a best price for manifolds and blocks with the type and interface details you need.",
      ],
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
    sizes: ["Dial: 2.5-4 inches"],
    copy: {
      title: "Pressure Gauges",
      intro:
        "Analog glycerine-filled and digital pressure gauges from H-Guru, Micro, Wika, and Mass. Dial sizes 2.5-4 inches.",
      seoBody: [
        "Pressure gauges let operators and maintenance teams read system pressure at pumps, manifolds, and test points. Specs include dial size, range, connection thread, and whether an analog glycerine-filled or digital display is preferred.",
        "Browse analog glycerine-filled and digital gauges in 2.5-4 inch dial sizes from H-Guru, Micro, Wika, and Mass. Filter by type and brand, then confirm pressure range and connection in your inquiry.",
        "Request a quote for pressure gauges with dial size, range, and make preference.",
      ],
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
      seoBody: [
        "Hydraulic heat exchangers remove heat from oil so viscosity and seal life stay within design limits. Air-cooled oil coolers and water-cooled exchangers are chosen by heat load, ambient conditions, and available cooling water.",
        "Browse air-cooled hydraulic oil coolers and water-cooled hydraulic heat exchangers. Inquire with oil flow, target temperature drop, and installation space so we can quote a suitable cooler.",
        "Get a best price for hydraulic heat exchangers with cooling type and duty details.",
      ],
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

/** Find a type/subtype node by slug within a type tree. */
export function findTaxonomyTypeNode(
  types: TaxonomyTypeNode[],
  slug: string,
): TaxonomyTypeNode | undefined {
  for (const type of types) {
    if (type.slug === slug) return type;
    const nested = findTaxonomyTypeNode(type.children ?? [], slug);
    if (nested) return nested;
  }
  return undefined;
}

/**
 * Slugs that match a type filter: the node itself plus descendants.
 * So `piston-pump` also matches `variable-displacement-piston-pump`.
 */
export function expandTypeFilterSlugs(
  categorySlug: string | undefined,
  typeSlug: string,
): string[] {
  const category = categorySlug
    ? getHydraulicCategory(categorySlug)
    : undefined;
  const trees = category
    ? category.types
    : hydraulicTaxonomy.flatMap((cat) => cat.types);
  const node = findTaxonomyTypeNode(trees, typeSlug);
  if (!node) return [typeSlug];
  return flattenTaxonomyTypes([node]).map((type) => type.slug);
}

/**
 * All category / type / subtype slug paths for SSG (`generateStaticParams`).
 * Example: `["pumps"]`, `["pumps","gear-pump"]`, `["pumps","gear-pump","internal-gear-pump"]`.
 */
export function getAllHydraulicCatalogueSlugPaths(): string[][] {
  const paths: string[][] = [];

  function walkTypes(nodes: TaxonomyTypeNode[], prefix: string[]) {
    for (const node of nodes) {
      const next = [...prefix, node.slug];
      paths.push(next);
      if (node.children?.length) {
        walkTypes(node.children, next);
      }
    }
  }

  for (const category of hydraulicTaxonomy) {
    paths.push([category.slug]);
    walkTypes(category.types, [category.slug]);
  }

  return paths;
}
