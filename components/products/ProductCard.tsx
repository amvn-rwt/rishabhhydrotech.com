import type { Product } from "@/lib/types/product.types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-white">
      <div className="aspect-square border-b border-border bg-brand-muted" aria-hidden="true" />
      <div className="px-3 py-3">
        <h3 className="type-h4 text-neutral-dark">
          {product.name}
        </h3>
      </div>
    </article>
  );
}
