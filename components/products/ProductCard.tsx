import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCategoryLabel } from "@/lib/data/products";
import { inquiryHref } from "@/lib/inquiry";
import type { Product } from "@/lib/types/product.types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = formatCategoryLabel(product.category);
  const href = inquiryHref({
    division: product.division,
    category: product.category,
    product: product.id,
  });

  return (
    <article className="flex h-full flex-col overflow-hidden border border-border bg-white">
      <div
        className="aspect-square border-b border-border bg-brand-muted"
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col gap-3 px-3 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {product.brand ? (
            <Badge
              variant="outline"
              className="border-brand/25 bg-brand-muted/50 font-heading text-brand"
            >
              {product.brand}
            </Badge>
          ) : null}
          <span className="type-caption text-neutral-mid">{categoryLabel}</span>
        </div>

        <h3 className="type-h4 text-neutral-dark">{product.name}</h3>

        <div className="mt-auto pt-1">
          <Button
            render={<Link href={href} />}
            nativeButton={false}
            className="w-full justify-center bg-accent text-white hover:bg-accent-hover"
          >
            Get Best Price
          </Button>
        </div>
      </div>
    </article>
  );
}
