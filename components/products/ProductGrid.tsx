import type { Product } from "@/lib/types/product.types";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="border border-border bg-white px-6 py-12 text-center">
        <p className="type-h4 text-neutral-dark">No products match these filters</p>
        <p className="type-body mt-2 text-neutral-mid">
          Clear one or more filters, or browse another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
