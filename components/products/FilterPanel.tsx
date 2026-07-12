import type { FilterGroup } from "@/lib/types/product.types";
import type {
  CatalogueFilterId,
  CatalogueSelectedFilters,
} from "@/lib/data/filter-params";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FilterPanelProps = {
  filters: FilterGroup[];
  selectedFilters: CatalogueSelectedFilters;
  onToggle: (groupId: CatalogueFilterId, value: string) => void;
  /** Prefix so desktop + mobile instances do not share checkbox ids. */
  idPrefix: string;
};

export function FilterPanel({
  filters,
  selectedFilters,
  onToggle,
  idPrefix,
}: FilterPanelProps) {
  return (
    <div className="divide-y divide-border">
      {filters.map((group) => {
        const groupId = group.id as CatalogueFilterId;
        const selected = new Set(selectedFilters[groupId] ?? []);

        return (
          <section key={group.id} className="px-4 py-4">
            <h3 className="type-overline mb-3 text-neutral-mid">{group.label}</h3>
            <ul className="flex flex-col gap-2">
              {group.options.map((option) => {
                const checked = selected.has(option.value);
                const checkboxId = `${idPrefix}-${group.id}-${option.value}`;

                return (
                  <li key={option.value}>
                    <Label
                      htmlFor={checkboxId}
                      className="type-body-sm flex cursor-pointer items-center gap-2 font-normal text-neutral-dark"
                    >
                      <Checkbox
                        id={checkboxId}
                        checked={checked}
                        onCheckedChange={() => onToggle(groupId, option.value)}
                      />
                      <span>{option.label}</span>
                    </Label>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** Flat list of selected options with resolved labels (for chips). */
export function getSelectedFilterChips(
  filters: FilterGroup[],
  selectedFilters: CatalogueSelectedFilters,
): { groupId: CatalogueFilterId; value: string; label: string }[] {
  const chips: {
    groupId: CatalogueFilterId;
    value: string;
    label: string;
  }[] = [];

  for (const group of filters) {
    const groupId = group.id as CatalogueFilterId;
    const values = selectedFilters[groupId];
    if (!values?.length) continue;

    const labelByValue = new Map(
      group.options.map((option) => [option.value, option.label]),
    );

    for (const value of values) {
      chips.push({
        groupId,
        value,
        label: labelByValue.get(value) ?? value,
      });
    }
  }

  return chips;
}
