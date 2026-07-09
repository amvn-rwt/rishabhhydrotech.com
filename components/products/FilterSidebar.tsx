import type { FilterGroup } from "@/lib/types/product.types";

type FilterSidebarProps = {
  filters: FilterGroup[];
};

export function FilterSidebar({ filters }: FilterSidebarProps) {
  return (
    <aside className="w-full shrink-0 border border-border bg-white lg:w-64">
      <div className="border-b border-border px-4 py-3">
        <h2 className="type-h4 uppercase tracking-wide text-neutral-dark">
          Filters
        </h2>
      </div>

      <div className="divide-y divide-border">
        {filters.map((group) => (
          <section key={group.id} className="px-4 py-4">
            <h3 className="type-overline mb-3 text-neutral-mid">
              {group.label}
            </h3>
            <ul className="space-y-2">
              {group.options.map((option) => (
                <li key={option.value}>
                  <label className="type-body-sm flex cursor-default items-center gap-2 text-neutral-dark">
                    <input
                      type="checkbox"
                      disabled
                      className="size-4 shrink-0 appearance-none border border-border bg-white checked:border-brand checked:bg-brand"
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
