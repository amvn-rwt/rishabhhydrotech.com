"use client";

import { startTransition, useOptimistic, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ListFilterIcon, XIcon } from "lucide-react";
import type { FilterGroup } from "@/lib/types/product.types";
import {
  countSelectedCatalogueFilters,
  hasSelectedCatalogueFilters,
  serializeCatalogueFilters,
  toggleCatalogueFilterValue,
  type CatalogueFilterId,
  type CatalogueSelectedFilters,
} from "@/lib/data/filter-params";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterPanel, getSelectedFilterChips } from "./FilterPanel";

type MobileFilterDrawerProps = {
  filters: FilterGroup[];
  selectedFilters: CatalogueSelectedFilters;
};

export function MobileFilterDrawer({
  filters,
  selectedFilters,
}: MobileFilterDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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

  const selectedCount = countSelectedCatalogueFilters(optimisticSelected);
  const showClear = hasSelectedCatalogueFilters(optimisticSelected);
  const chips = getSelectedFilterChips(filters, optimisticSelected);

  if (filters.length === 0) return null;

  return (
    <div className="lg:hidden">
      <div className="border border-border bg-white">
        <div className="flex items-center gap-2 px-3 py-2.5">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  className="h-9 gap-2 border-border bg-white px-3 font-heading text-neutral-dark hover:bg-brand-muted"
                />
              }
            >
              <ListFilterIcon data-icon="inline-start" />
              Filters
              {selectedCount > 0 ? (
                <span
                  className="type-caption ml-0.5 inline-flex min-w-5 items-center justify-center bg-brand px-1.5 text-white"
                  aria-label={`${selectedCount} active`}
                >
                  {selectedCount}
                </span>
              ) : null}
            </SheetTrigger>

            <SheetContent
              side="left"
              showCloseButton={false}
              className="w-full max-w-sm gap-0 border-border bg-white p-0 shadow-none"
            >
              <SheetHeader className="border-b border-border p-0">
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <div className="min-w-0">
                    <SheetTitle className="type-h4 text-neutral-dark">
                      Filters
                    </SheetTitle>
                    <SheetDescription className="type-caption mt-0.5 text-neutral-mid">
                      {selectedCount > 0
                        ? `${selectedCount} selected`
                        : "Narrow by category, brand, or type"}
                    </SheetDescription>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    {showClear ? (
                      <button
                        type="button"
                        onClick={onClear}
                        className="type-body-sm px-2 py-1 text-brand hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        Reset
                      </button>
                    ) : null}
                    <SheetClose
                      render={
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-neutral-mid hover:bg-brand-muted hover:text-neutral-dark"
                        />
                      }
                    >
                      <XIcon />
                      <span className="sr-only">Close filters</span>
                    </SheetClose>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                <FilterPanel
                  filters={filters}
                  selectedFilters={optimisticSelected}
                  onToggle={onToggle}
                  idPrefix="filter-mobile"
                />
              </div>

              <SheetFooter className="mt-0 border-t border-border p-4">
                <SheetClose
                  render={
                    <Button className="w-full justify-center bg-brand text-white hover:bg-brand-dark" />
                  }
                >
                  Show results
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {showClear ? (
            <button
              type="button"
              onClick={onClear}
              className="type-body-sm ml-auto text-brand hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              Reset
            </button>
          ) : null}
        </div>

        {chips.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto border-t border-border px-3 py-2">
            {chips.map((chip) => (
              <button
                key={`${chip.groupId}-${chip.value}`}
                type="button"
                onClick={() => onToggle(chip.groupId, chip.value)}
                className="type-caption inline-flex shrink-0 items-center gap-1.5 border border-border bg-brand-muted/60 px-2 py-1 text-neutral-dark hover:border-brand/40 hover:bg-brand-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                aria-label={`Remove ${chip.label} filter`}
              >
                <span>{chip.label}</span>
                <XIcon className="size-3 text-neutral-mid" aria-hidden />
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
