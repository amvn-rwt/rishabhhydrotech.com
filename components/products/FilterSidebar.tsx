"use client";

import { startTransition, useOptimistic } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { FilterGroup } from "@/lib/types/product.types";
import {
  hasSelectedCatalogueFilters,
  serializeCatalogueFilters,
  toggleCatalogueFilterValue,
  type CatalogueFilterId,
  type CatalogueSelectedFilters,
} from "@/lib/data/filter-params";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type FilterSidebarProps = {
  filters: FilterGroup[];
  selectedFilters: CatalogueSelectedFilters;
};

export function FilterSidebar({
  filters,
  selectedFilters,
}: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [optimisticSelected, setOptimisticSelected] =
    useOptimistic(selectedFilters);

  function applyFilters(next: CatalogueSelectedFilters) {
    const qs = serializeCatalogueFilters(next);
    const href = qs ? `${pathname}?${qs}` : pathname;
    startTransition(() => {
      setOptimisticSelected(next);
      router.replace(href, { scroll: false });
    });
  }

  function onToggle(groupId: CatalogueFilterId, value: string) {
    applyFilters(toggleCatalogueFilterValue(optimisticSelected, groupId, value));
  }

  function onClear() {
    applyFilters({});
  }

  const showClear = hasSelectedCatalogueFilters(optimisticSelected);

  if (filters.length === 0) return null;

  return (
    <aside className="w-full shrink-0 overflow-hidden border border-border bg-white lg:w-64">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
        <h2 className="type-h4 uppercase tracking-wide text-neutral-dark">
          Filters
        </h2>
        {showClear ? (
          <button
            type="button"
            onClick={onClear}
            className="type-body-sm text-brand hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="divide-y divide-border">
        {filters.map((group) => {
          const groupId = group.id as CatalogueFilterId;
          const selected = new Set(optimisticSelected[groupId] ?? []);

          return (
            <section key={group.id} className="px-4 py-4">
              <h3 className="type-overline mb-3 text-neutral-mid">
                {group.label}
              </h3>
              <ul className="space-y-2">
                {group.options.map((option) => {
                  const checked = selected.has(option.value);
                  const checkboxId = `filter-${group.id}-${option.value}`;

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
    </aside>
  );
}
