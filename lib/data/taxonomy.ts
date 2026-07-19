import type {
  CategoryTaxonomy,
  HydraulicCategoryTaxonomy,
  PneumaticCategoryTaxonomy,
  ProductDivision,
  TaxonomyTypeNode,
} from "@/lib/types/product.types";
import { siteConfig } from "@/lib/data/site";

/** Own-brand make listed in taxonomy. Same company as `siteConfig.name`. */
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
        "This catalogue covers gear pumps (internal and external), piston pumps including variable displacement designs, and vane pumps in fixed and variable configurations. Makes we deal in include Yuken, Vickers, Rexroth, Daikin, Veljan, THM Haude, Nachi, Eckerle, and Voith.",
        "Use the type cards above to open a gear, piston, or vane landing. When you have a model number, mounting style, or shaft detail from the machine plate, include it in your inquiry so we can quote the correct replacement or upgrade.",
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
        "Browse by type to match manifold patterns and subplate standards already on the machine. For CETOP or modular stacks, note the size and interface in your quote request.",
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
        "Choose a pressure or specialty type above. For replacements, share working pressure, hose ID, length, and fitting style so the assembly matches the line already on the plant.",
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
        "Use type filters to shortlist options, then confirm thread callout and sealing face (JIC, BSP, ORFS, and similar) in your inquiry.",
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
        "Displacement coverage here is 100-3500 cc across Danfoss, THM Haude, Entermote, SAI, Vickers, Rexroth, and Eagle. Browse by make to match the brand already on the machine or to evaluate alternatives in the same size class.",
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
        `Browse diaphragm, piston, and bladder units from 1-50 litre. Makes include Hydac, EPE, Parker, Oliver, and ${HOUSE_BRAND}. Filter by type, then confirm volume and pressure rating in your quote request.`,
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
        "Filter by line type, then inquire with micron rating, port size, and element part number if known.",
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
        "Browse analog glycerine-filled and digital gauges in 2.5-4 inch dial sizes from H-Guru, Micro, Wika, and Mass. Filter by type, then confirm pressure range and connection in your inquiry.",
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

/** OEM makes shared across all pneumatic categories (WEBSITE_PLAN §6.3). */
const PNEUMATIC_MAKES = [
  "Festo",
  "SMC",
  "Aventics (Emerson)",
  "Camozzi",
  "Metal Work Pneumatic",
  "Pneumax",
  "AirTAC",
  "Mindman",
  "Parker Hannifin",
  "Norgren (IMI)",
  "ASCO (Emerson)",
  "CKD",
  "Pisco",
  "EMC Pneumatics",
  "Sang-A",
  "Legris (Parker)",
  "Numatics (Emerson)",
];

function pneumaticCategory(
  slug: string,
  name: string,
  types: string[],
  copy: CategoryTaxonomy["copy"],
): PneumaticCategoryTaxonomy {
  return {
    slug,
    name,
    makes: [...PNEUMATIC_MAKES],
    types: types.map((label) => typeNode(label)),
    copy,
  };
}

/**
 * Full pneumatic taxonomy — 12 categories from WEBSITE_PLAN §6.3.
 * Makes and types match the client brief; do not invent entries.
 */
export const pneumaticTaxonomy: PneumaticCategoryTaxonomy[] = [
  pneumaticCategory(
    "air-preparation",
    "Air Preparation",
    [
      "FRL Units (Filter, Regulator, Lubricator)",
      "Air Filters",
      "Pressure Regulators",
      "Air Lubricators",
      "Filter Regulators",
      "Moisture Separators",
      "Air Dryers",
    ],
    {
      title: "Air Preparation",
      intro:
        "FRL units, filters, regulators, lubricators, moisture separators, and air dryers from Festo, SMC, Aventics, and other listed makes.",
      seoBody: [
        "Air preparation equipment cleans, regulates, and conditions compressed air before it reaches valves, cylinders, and tools. Specs usually include port size, filtration micron rating, pressure range, and whether lubrication is required.",
        "Browse FRL units, air filters, pressure regulators, air lubricators, filter regulators, moisture separators, and air dryers. Makes listed for this category include Festo, SMC, Aventics (Emerson), Camozzi, AirTAC, Parker Hannifin, Norgren (IMI), and more.",
        "Browse by type to match the existing air line. Include port thread, flow, and working pressure in your inquiry so we can quote the correct assembly.",
        "Request a best price for air preparation products with the type and make you need.",
      ],
    },
  ),
  {
    slug: "pressure-gauges",
    name: "Pressure Gauges",
    makes: [...PNEUMATIC_MAKES],
    types: [],
    copy: {
      title: "Pneumatic Pressure Gauges",
      intro:
        "Pressure gauges for pneumatic circuits from Festo, SMC, Parker Hannifin, and other listed makes.",
      seoBody: [
        "Pneumatic pressure gauges show line and regulator pressure for setup, monitoring, and troubleshooting. Buyers typically specify dial size, pressure range, connection thread, and mounting style.",
        "Makes we deal in include Festo, SMC, Aventics (Emerson), Camozzi, AirTAC, Parker Hannifin, Norgren (IMI), and other listed brands.",
        "Share the pressure range and connection size in your quote request so we can match the gauge to your circuit.",
        "Get a best price for pneumatic pressure gauges with range and make preference.",
      ],
    },
  },
  pneumaticCategory(
    "cylinders",
    "Pneumatic Cylinders",
    [
      "Standard Cylinders",
      "Compact Cylinders",
      "Mini Cylinders",
      "Round Body Cylinders",
      "Guided Cylinders",
      "Rodless Cylinders",
      "Twin Rod Cylinders",
      "Rotary Actuators",
      "Clamp Cylinders",
      "Gripper Cylinders",
    ],
    {
      title: "Pneumatic Cylinders",
      intro:
        "Standard, compact, guided, rodless, and specialty pneumatic cylinders plus rotary actuators from Festo, SMC, and other listed makes.",
      seoBody: [
        "Pneumatic cylinders convert compressed air into linear or rotary motion for clamping, transfer, and machine actuation. Selection depends on bore, stroke, mounting, cushioning, and duty cycle.",
        "This range covers standard, compact, mini, round body, guided, rodless, twin rod, clamp, and gripper cylinders plus rotary actuators. Makes include Festo, SMC, Aventics (Emerson), Camozzi, AirTAC, and more.",
        "Open a type card, then include bore, stroke, and mounting style in your inquiry for a matching quote.",
        "Request a best price for pneumatic cylinders with type, size, and make details.",
      ],
    },
  ),
  pneumaticCategory(
    "valves",
    "Pneumatic Valves",
    [
      "Solenoid Valves",
      "Mechanical Valves",
      "Manual Valves",
      "Foot Operated Valves",
      "Hand Lever Valves",
      "Shuttle Valves",
      "Check Valves",
      "Flow Control Valves",
      "Quick Exhaust Valves",
      "Directional Control Valves",
      "Pneumatic Logic Valves",
    ],
    {
      title: "Pneumatic Valves",
      intro:
        "Solenoid, mechanical, manual, and directional pneumatic valves from Festo, SMC, ASCO, and other listed makes.",
      seoBody: [
        "Pneumatic valves direct and control air flow in industrial circuits. Specs usually include function, port size, voltage for solenoids, and mounting (inline, manifold, or sub-base).",
        "Browse solenoid, mechanical, manual, foot operated, hand lever, shuttle, check, flow control, quick exhaust, directional control, and pneumatic logic valves. Makes include Festo, SMC, ASCO (Emerson), Camozzi, Norgren (IMI), and more.",
        "Browse by type to match existing valve islands and port standards. Note voltage and port size in your quote request.",
        "Get a best price for pneumatic valves by function, make, and port details.",
      ],
    },
  ),
  pneumaticCategory(
    "fittings",
    "Pneumatic Fittings",
    [
      "Push-in Fittings",
      "Straight Connectors",
      "Elbow Connectors",
      "Tee Connectors",
      "Y Connectors",
      "Bulkhead Fittings",
      "Banjo Fittings",
      "Reducers",
      "Adapters",
      "Silencers (Mufflers)",
    ],
    {
      title: "Pneumatic Fittings",
      intro:
        "Push-in fittings, connectors, reducers, adapters, and silencers from Pisco, Legris, SMC, and other listed makes.",
      seoBody: [
        "Pneumatic fittings join tubing and threaded ports in compressed-air systems. Buyers specify tube OD, thread form, shape, and material.",
        "This catalogue covers push-in fittings, straight, elbow, tee, and Y connectors, bulkhead and banjo fittings, reducers, adapters, and silencers (mufflers). Makes include Pisco, Legris (Parker), SMC, Festo, Camozzi, and more.",
        "Choose a fitting type, then share tube size and thread in your inquiry.",
        "Request a quote for pneumatic fittings by type, size, and make.",
      ],
    },
  ),
  pneumaticCategory(
    "tubing",
    "Pneumatic Tubing",
    [
      "PU Tubes",
      "Nylon Tubes",
      "PTFE Tubes",
      "PE Tubes",
      "Coiled Air Hoses",
      "Braided Air Hoses",
    ],
    {
      title: "Pneumatic Tubing",
      intro:
        "PU, nylon, PTFE, and PE tubes plus coiled and braided air hoses from listed pneumatic makes.",
      seoBody: [
        "Pneumatic tubing carries compressed air between preparation equipment, valves, and actuators. Material, OD, and pressure rating must match the circuit and fittings.",
        "Browse PU, nylon, PTFE, and PE tubes plus coiled and braided air hoses. Makes include Festo, SMC, Parker Hannifin, Pisco, and other listed brands.",
        "Include tube OD, length, and working pressure in your quote request.",
        "Get a best price for pneumatic tubing with material and size details.",
      ],
    },
  ),
  pneumaticCategory(
    "air-blow-equipment",
    "Air Blow Equipment",
    ["Air Blow Guns", "Air Nozzles", "Safety Air Guns", "Air Dusters"],
    {
      title: "Air Blow Equipment",
      intro:
        "Air blow guns, nozzles, safety air guns, and dusters for shop and production use.",
      seoBody: [
        "Air blow equipment uses compressed air for cleaning, drying, and chip removal. Specs include nozzle style, flow, noise level, and safety features.",
        "Browse air blow guns, air nozzles, safety air guns, and air dusters from Festo, SMC, and other listed makes.",
        "Share the application and connection size in your inquiry so we can quote the right tool.",
        "Request a best price for air blow equipment with type and make preference.",
      ],
    },
  ),
  pneumaticCategory(
    "vacuum-components",
    "Vacuum Components",
    [
      "Vacuum Cups",
      "Vacuum Generators",
      "Vacuum Filters",
      "Vacuum Pads",
      "Vacuum Switches",
      "Vacuum Ejectors",
    ],
    {
      title: "Vacuum Components",
      intro:
        "Vacuum cups, generators, filters, pads, switches, and ejectors from Festo, SMC, and other listed makes.",
      seoBody: [
        "Vacuum components create and control vacuum for pick-and-place, packaging, and handling. Selection depends on cup size, generator flow, and switch setpoints.",
        "This range covers vacuum cups, generators, filters, pads, switches, and ejectors. Makes include Festo, SMC, Pisco, Camozzi, and more.",
        "Filter by type, then note workpiece material and cup size in your quote request.",
        "Get a best price for vacuum components with type and application details.",
      ],
    },
  ),
  pneumaticCategory(
    "accessories",
    "Pneumatic Accessories",
    [
      "Pneumatic Manifolds",
      "Cylinder Mounting Accessories",
      "Piston Rod Accessories",
      "Tube Cutters",
      "Hose Clamps",
      "Air Pressure Switches",
      "Solenoid Coils",
      "Valve Connectors",
    ],
    {
      title: "Pneumatic Accessories",
      intro:
        "Manifolds, mounting hardware, pressure switches, solenoid coils, and related pneumatic accessories.",
      seoBody: [
        "Pneumatic accessories support installation, sensing, and maintenance of air circuits. Specs vary by cylinder series, valve connector type, and switch rating.",
        "Browse pneumatic manifolds, cylinder mounting and piston rod accessories, tube cutters, hose clamps, air pressure switches, solenoid coils, and valve connectors.",
        "Include the parent valve or cylinder series in your inquiry when replacing coils, mounts, or switches.",
        "Request a quote for pneumatic accessories by type and make.",
      ],
    },
  ),
  pneumaticCategory(
    "air-compressors",
    "Air Compressors & Accessories",
    [
      "Air Compressors",
      "Compressor Filters",
      "Air Receivers",
      "Drain Valves",
      "Compressor Oil",
      "Compressor Spare Parts",
    ],
    {
      title: "Air Compressors & Accessories",
      intro:
        "Air compressors, receivers, filters, drain valves, oil, and spare parts for plant air supply.",
      seoBody: [
        "Air compressors and related accessories supply and condition plant air. Buyers specify capacity, pressure, tank size, and filtration needs.",
        "Browse air compressors, compressor filters, air receivers, drain valves, compressor oil, and spare parts. Filter by listed makes where applicable.",
        "Share required CFM, pressure, and duty in your quote request.",
        "Get a best price for air compressors and accessories with capacity and type details.",
      ],
    },
  ),
  pneumaticCategory(
    "tools",
    "Pneumatic Tools",
    [
      "Air Impact Wrenches",
      "Air Drills",
      "Air Screwdrivers",
      "Air Grinders",
      "Air Sanders",
      "Air Ratchets",
      "Air Hammers",
      "Spray Guns",
      "Air Nailers",
      "Air Staplers",
    ],
    {
      title: "Pneumatic Tools",
      intro:
        "Air impact wrenches, drills, grinders, sanders, spray guns, and other pneumatic tools.",
      seoBody: [
        "Pneumatic tools use compressed air for fastening, cutting, finishing, and assembly. Specs include drive size, RPM, air consumption, and duty rating.",
        "This catalogue covers air impact wrenches, drills, screwdrivers, grinders, sanders, ratchets, hammers, spray guns, nailers, and staplers.",
        "Filter by type, then include drive size or application in your inquiry.",
        "Request a best price for pneumatic tools with type and make preference.",
      ],
    },
  ),
  pneumaticCategory(
    "industrial-automation",
    "Industrial Automation Components",
    [
      "Pneumatic Actuators",
      "Pneumatic Grippers",
      "Air Slides",
      "Rotary Tables",
      "Sensor Switches for Cylinders",
      "Reed Switches",
      "Cylinder Position Sensors",
    ],
    {
      title: "Industrial Automation Components",
      intro:
        "Pneumatic actuators, grippers, air slides, rotary tables, and cylinder position sensors from listed makes.",
      seoBody: [
        "Industrial automation components use pneumatics for repeatable motion and sensing on machines and fixtures. Specs include stroke, grip force, sensor type, and mounting.",
        "Browse pneumatic actuators, grippers, air slides, rotary tables, sensor switches for cylinders, reed switches, and cylinder position sensors. Makes include Festo, SMC, AirTAC, Camozzi, and more.",
        "Open a type card and note the parent cylinder or series when ordering sensors.",
        "Get a best price for automation components with type, size, and make details.",
      ],
    },
  ),
];

const hydraulicCategoryBySlug = new Map(
  hydraulicTaxonomy.map((category) => [category.slug, category]),
);

const pneumaticCategoryBySlug = new Map(
  pneumaticTaxonomy.map((category) => [category.slug, category]),
);

export function getTaxonomyForDivision(
  division: ProductDivision,
): CategoryTaxonomy[] {
  return division === "pneumatic" ? pneumaticTaxonomy : hydraulicTaxonomy;
}

export function getCategoryForDivision(
  division: ProductDivision,
  slug: string,
): CategoryTaxonomy | undefined {
  return division === "pneumatic"
    ? pneumaticCategoryBySlug.get(slug)
    : hydraulicCategoryBySlug.get(slug);
}

export function getHydraulicCategory(
  slug: string,
): HydraulicCategoryTaxonomy | undefined {
  return hydraulicCategoryBySlug.get(slug);
}

export function getPneumaticCategory(
  slug: string,
): PneumaticCategoryTaxonomy | undefined {
  return pneumaticCategoryBySlug.get(slug);
}

export function getHydraulicCategorySlugs(): string[] {
  return hydraulicTaxonomy.map((category) => category.slug);
}

export function getPneumaticCategorySlugs(): string[] {
  return pneumaticTaxonomy.map((category) => category.slug);
}

function labelFromTaxonomyList(
  taxonomy: CategoryTaxonomy[],
  slug: string,
): string | undefined {
  for (const cat of taxonomy) {
    if (cat.slug === slug) return cat.name;
    for (const type of cat.types) {
      if (type.slug === slug) return type.label;
      for (const child of type.children ?? []) {
        if (child.slug === slug) return child.label;
      }
    }
  }
  return undefined;
}

/** Resolve a display label for a category, type, or subtype slug from the taxonomy. */
export function getTaxonomyLabelBySlug(
  slug: string,
  division?: ProductDivision,
): string | undefined {
  if (division) {
    return labelFromTaxonomyList(getTaxonomyForDivision(division), slug);
  }

  return (
    labelFromTaxonomyList(hydraulicTaxonomy, slug) ??
    labelFromTaxonomyList(pneumaticTaxonomy, slug)
  );
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
  division?: ProductDivision,
): string[] {
  let trees: TaxonomyTypeNode[];

  if (categorySlug && division) {
    trees = getCategoryForDivision(division, categorySlug)?.types ?? [];
  } else if (categorySlug) {
    const hydraulic = getHydraulicCategory(categorySlug);
    const pneumatic = getPneumaticCategory(categorySlug);
    trees = [...(hydraulic?.types ?? []), ...(pneumatic?.types ?? [])];
  } else if (division) {
    trees = getTaxonomyForDivision(division).flatMap((cat) => cat.types);
  } else {
    trees = [...hydraulicTaxonomy, ...pneumaticTaxonomy].flatMap(
      (cat) => cat.types,
    );
  }

  const node = findTaxonomyTypeNode(trees, typeSlug);
  if (!node) return [typeSlug];
  return flattenTaxonomyTypes([node]).map((type) => type.slug);
}

function catalogueSlugPathsForTaxonomy(
  taxonomy: CategoryTaxonomy[],
): string[][] {
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

  for (const category of taxonomy) {
    paths.push([category.slug]);
    walkTypes(category.types, [category.slug]);
  }

  return paths;
}

/**
 * All category / type / subtype slug paths for SSG (`generateStaticParams`).
 * Example: `["pumps"]`, `["pumps","gear-pump"]`, `["pumps","gear-pump","internal-gear-pump"]`.
 */
export function getAllHydraulicCatalogueSlugPaths(): string[][] {
  return catalogueSlugPathsForTaxonomy(hydraulicTaxonomy);
}

/** All pneumatic category / type slug paths for SSG. */
export function getAllPneumaticCatalogueSlugPaths(): string[][] {
  return catalogueSlugPathsForTaxonomy(pneumaticTaxonomy);
}
