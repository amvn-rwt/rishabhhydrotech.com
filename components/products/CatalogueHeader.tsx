import { Breadcrumbs, type Breadcrumb } from "@/components/layout/Breadcrumbs";

type CatalogueHeaderProps = {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
  productCount: number;
};

export function CatalogueHeader({
  title,
  description,
  breadcrumbs,
  productCount,
}: CatalogueHeaderProps) {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} className="mb-4" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="type-h1 text-balance text-neutral-dark">
              {title}
            </h1>
            <p className="type-lead mt-2 max-w-3xl text-pretty text-neutral-mid">
              {description}
            </p>
          </div>
          <p className="type-body-sm text-neutral-mid tabular-nums">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
    </header>
  );
}
