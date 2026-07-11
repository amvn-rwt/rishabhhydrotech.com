import type { Product, ProductDivision } from "@/lib/types/product.types";

/** Hydraulic sample/seed products only. Pneumatic catalogue deferred until client taxonomy. */
const hydraulicProducts: Product[] = [
  { id: "h-1", name: "Variable Displacement Piston Pump", division: "hydraulic", category: "pumps", brand: "Rexroth", type: "piston-pump" },
  { id: "h-2", name: "Internal Gear Pump", division: "hydraulic", category: "pumps", brand: "Yuken", type: "gear-pump" },
  { id: "h-3", name: "Direction Control Valve", division: "hydraulic", category: "valves", brand: "Vickers", type: "direction-control-valve" },
  { id: "h-4", name: "High Pressure Hydraulic Hose", division: "hydraulic", category: "hoses", brand: "Parker" },
  { id: "h-5", name: "Double Acting Hydraulic Cylinder", division: "hydraulic", category: "cylinders", brand: "Parker Taiyo" },
  { id: "h-6", name: "Fixed Displacement Vane Pump", division: "hydraulic", category: "pumps", brand: "Daikin", type: "vane-pump" },
  { id: "h-7", name: "Pressure Relief Valve", division: "hydraulic", category: "valves", brand: "Rexroth" },
  { id: "h-8", name: "Hydraulic Power Pack Unit", division: "hydraulic", category: "power-packs", brand: "Rishabh Hydro Tech Engineers" },
  { id: "h-9", name: "External Gear Pump", division: "hydraulic", category: "pumps", brand: "Veljan", type: "gear-pump" },
];

export function getProductsForDivision(division?: ProductDivision): Product[] {
  if (division === "hydraulic") return hydraulicProducts;
  // Pneumatic: add when client delivers taxonomy (WEBSITE_PLAN §6.3)
  return hydraulicProducts;
}

export function formatCategoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
