import type { CataloguePageConfig } from "@/lib/types/product.types";
import { CatalogueBrandsStrip } from "./CatalogueBrandsStrip";
import { CatalogueHeader } from "./CatalogueHeader";
import { CatalogueInquiryCTA } from "./CatalogueInquiryCTA";
import { CatalogueSeoCopy } from "./CatalogueSeoCopy";
import { FilterSidebar } from "./FilterSidebar";
import { LandingCardGrid } from "./LandingCardGrid";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { ProductGrid } from "./ProductGrid";
import { RelatedCategories } from "./RelatedCategories";

type CatalogueLayoutProps = {
  config: CataloguePageConfig;
};

export function CatalogueLayout({ config }: CatalogueLayoutProps) {
  const hasLanding = Boolean(config.landing?.cards.length);
  const brandsHeading = config.relatedCategories
    ? "Makes in this category"
    : "Brands we deal in";

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
            {config.landing ? (
              <LandingCardGrid landing={config.landing} />
            ) : null}

            {hasLanding ? (
              <h2 className="type-h3 mb-4 text-neutral-dark">Products</h2>
            ) : null}

            <ProductGrid products={config.products} />
          </section>
        </div>
      </div>

      {config.brands ? (
        <CatalogueBrandsStrip brands={config.brands} heading={brandsHeading} />
      ) : null}

      <CatalogueInquiryCTA cta={config.inquiryCta} />

      {config.relatedCategories ? (
        <RelatedCategories categories={config.relatedCategories} />
      ) : null}

      {config.seoBody ? <CatalogueSeoCopy paragraphs={config.seoBody} /> : null}
    </div>
  );
}
