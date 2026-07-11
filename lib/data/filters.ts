import type { FilterGroup, ProductDivision } from "@/lib/types/product.types";

/** Hydraulic filters only. Pneumatic filters deferred until client taxonomy (WEBSITE_PLAN §6.3). */
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

export function getFiltersForDivision(division?: ProductDivision): FilterGroup[] {
  if (division === "hydraulic") return hydraulicFilters;
  // Hub / unknown: hydraulic only until pneumatic taxonomy arrives
  return hydraulicFilters;
}
