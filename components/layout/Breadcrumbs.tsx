import Link from "next/link";

export type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="type-body-sm flex flex-wrap items-center gap-2 text-neutral-mid">
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${crumb.label}-${index}`}
              className="flex items-center gap-2"
            >
              {index > 0 && <span aria-hidden="true">/</span>}
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="text-brand transition-colors hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-neutral-dark" : undefined}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
