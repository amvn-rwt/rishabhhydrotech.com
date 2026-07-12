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
import { FilterPanel } from "./FilterPanel";

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
    <aside className="hidden w-full shrink-0 border border-border bg-white lg:sticky lg:top-20 lg:block lg:w-64 lg:max-h-[calc(100dvh-5.5rem)] lg:self-start lg:overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-border bg-white px-4 py-3">
        <h2 className="type-h4 text-neutral-dark">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          disabled={!showClear}
          aria-hidden={!showClear}
          tabIndex={showClear ? undefined : -1}
          className={
            showClear
              ? "type-body-sm text-brand hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              : "type-body-sm invisible"
          }
        >
          Reset filters
        </button>
      </div>

      <FilterPanel
        filters={filters}
        selectedFilters={optimisticSelected}
        onToggle={onToggle}
        idPrefix="filter-desktop"
      />
    </aside>
  );
}
