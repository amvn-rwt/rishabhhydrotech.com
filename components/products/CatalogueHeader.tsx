import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

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
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="type-body-sm flex flex-wrap items-center gap-2 text-neutral-mid">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="text-brand hover:text-brand-dark"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-neutral-dark" : undefined}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="type-h1 text-neutral-dark">
              {title}
            </h1>
            <p className="type-lead mt-2 max-w-3xl text-neutral-mid">
              {description}
            </p>
          </div>
          <p className="type-body-sm text-neutral-mid">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
    </header>
  );
}
