import type { CataloguePageConfig } from "@/lib/types/product.types";
import { CatalogueHeader } from "./CatalogueHeader";
import { FilterSidebar } from "./FilterSidebar";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { ProductGrid } from "./ProductGrid";

type CatalogueLayoutProps = {
  config: CataloguePageConfig;
};

export function CatalogueLayout({ config }: CatalogueLayoutProps) {
  return (
    <div className="flex min-h-full flex-col bg-brand-muted">
      <CatalogueHeader
        title={config.title}
        description={config.description}
        breadcrumbs={config.breadcrumbs}
        productCount={config.products.length}
      />

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <MobileFilterDrawer
            filters={config.filters}
            selectedFilters={config.selectedFilters}
          />
          <FilterSidebar
            filters={config.filters}
            selectedFilters={config.selectedFilters}
          />
          <section className="min-w-0 flex-1" aria-live="polite">
            <ProductGrid products={config.products} />
          </section>
        </div>
      </div>
    </div>
  );
}
