import type { FilterGroup, ProductDivision } from "@/lib/types/product.types";

const hydraulicFilters: FilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { label: "Pumps", value: "pumps" },
      { label: "Valves", value: "valves" },
      { label: "Hoses", value: "hoses" },
      { label: "Cylinders", value: "cylinders" },
      { label: "Power packs", value: "power-packs" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    options: [
      { label: "Yuken", value: "yuken" },
      { label: "Rexroth", value: "rexroth" },
      { label: "Vickers", value: "vickers" },
      { label: "Parker", value: "parker" },
      { label: "Daikin", value: "daikin" },
    ],
  },
  {
    id: "type",
    label: "Type",
    options: [
      { label: "Gear pump", value: "gear-pump" },
      { label: "Piston pump", value: "piston-pump" },
      { label: "Vane pump", value: "vane-pump" },
      { label: "Direction control valve", value: "direction-control-valve" },
    ],
  },
];

const pneumaticFilters: FilterGroup[] = [
  {
    id: "category",
    label: "Category",
    options: [
      { label: "Cylinders", value: "cylinders" },
      { label: "Valves", value: "valves" },
      { label: "FRL units", value: "frl-units" },
      { label: "Tubing & hoses", value: "tubing" },
      { label: "Fittings", value: "fittings" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    options: [
      { label: "Festo", value: "festo" },
      { label: "SMC", value: "smc" },
      { label: "Airtac", value: "airtac" },
      { label: "Janatics", value: "janatics" },
    ],
  },
  {
    id: "type",
    label: "Type",
    options: [
      { label: "Compact cylinder", value: "compact-cylinder" },
      { label: "Solenoid valve", value: "solenoid-valve" },
      { label: "Filter regulator", value: "filter-regulator" },
    ],
  },
];

const allFilters: FilterGroup[] = [
  {
    id: "division",
    label: "Division",
    options: [
      { label: "Hydraulic", value: "hydraulic" },
      { label: "Pneumatic", value: "pneumatic" },
    ],
  },
  ...hydraulicFilters,
];

export function getFiltersForDivision(division?: ProductDivision): FilterGroup[] {
  if (division === "hydraulic") return hydraulicFilters;
  if (division === "pneumatic") return pneumaticFilters;
  return allFilters;
}
