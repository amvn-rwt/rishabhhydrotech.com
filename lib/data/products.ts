import type { Product, ProductDivision } from "@/lib/types/product.types";

const hydraulicProducts: Product[] = [
  { id: "h-1", name: "Variable Displacement Piston Pump", division: "hydraulic", category: "pumps", brand: "Rexroth", type: "piston-pump" },
  { id: "h-2", name: "Internal Gear Pump", division: "hydraulic", category: "pumps", brand: "Yuken", type: "gear-pump" },
  { id: "h-3", name: "Direction Control Valve", division: "hydraulic", category: "valves", brand: "Vickers", type: "direction-control-valve" },
  { id: "h-4", name: "High Pressure Hydraulic Hose", division: "hydraulic", category: "hoses", brand: "Parker" },
  { id: "h-5", name: "Double Acting Hydraulic Cylinder", division: "hydraulic", category: "cylinders", brand: "Yuken" },
  { id: "h-6", name: "Fixed Displacement Vane Pump", division: "hydraulic", category: "pumps", brand: "Daikin", type: "vane-pump" },
  { id: "h-7", name: "Pressure Relief Valve", division: "hydraulic", category: "valves", brand: "Rexroth" },
  { id: "h-8", name: "Hydraulic Power Pack Unit", division: "hydraulic", category: "power-packs", brand: "Yuken" },
  { id: "h-9", name: "External Gear Pump", division: "hydraulic", category: "pumps", brand: "Veljan", type: "gear-pump" },
];

const pneumaticProducts: Product[] = [
  { id: "p-1", name: "Compact Pneumatic Cylinder", division: "pneumatic", category: "cylinders", brand: "Festo", type: "compact-cylinder" },
  { id: "p-2", name: "5/2 Solenoid Valve", division: "pneumatic", category: "valves", brand: "SMC", type: "solenoid-valve" },
  { id: "p-3", name: "FRL Unit — Filter Regulator Lubricator", division: "pneumatic", category: "frl-units", brand: "Janatics" },
  { id: "p-4", name: "Polyurethane Tubing", division: "pneumatic", category: "tubing", brand: "Festo" },
  { id: "p-5", name: "Push-in Fitting", division: "pneumatic", category: "fittings", brand: "SMC" },
  { id: "p-6", name: "Round Body Cylinder", division: "pneumatic", category: "cylinders", brand: "Airtac" },
  { id: "p-7", name: "3/2 Way Solenoid Valve", division: "pneumatic", category: "valves", brand: "Festo", type: "solenoid-valve" },
  { id: "p-8", name: "Air Filter Regulator", division: "pneumatic", category: "frl-units", brand: "SMC", type: "filter-regulator" },
  { id: "p-9", name: "Guided Compact Cylinder", division: "pneumatic", category: "cylinders", brand: "Janatics", type: "compact-cylinder" },
];

export function getProductsForDivision(division?: ProductDivision): Product[] {
  if (division === "hydraulic") return hydraulicProducts;
  if (division === "pneumatic") return pneumaticProducts;
  return [...hydraulicProducts, ...pneumaticProducts];
}

export function formatCategoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
