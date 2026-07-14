"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import { formatCategoryLabel } from "@/lib/data/products";
import type { Product } from "@/lib/types/product.types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabel = formatCategoryLabel(product.category);

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

        <h3 className="type-h4 wrap-break-word text-neutral-dark">
          {product.name}
        </h3>

        <div className="mt-auto pt-1">
          <InquiryModal
            defaults={{
              division: product.division,
              category: product.category,
              product: product.id,
              brand: product.brand,
            }}
            title={`Get Best Price: ${product.name}`}
            description={`Request pricing for this ${categoryLabel.toLowerCase()} item. Add model numbers or specs in the message.`}
            triggerLabel="Get Best Price"
            trigger={
              <Button className="w-full justify-center bg-accent text-white hover:bg-accent-hover" />
            }
          />
        </div>
      </div>
    </article>
  );
}
