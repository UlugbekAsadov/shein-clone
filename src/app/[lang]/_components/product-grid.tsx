import type { Product } from "@/lib/mock-data";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  className?: string;
  variant?: "default" | "dark";
};

export function ProductGrid({ products, className, variant }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5",
        className,
      )}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} variant={variant} />
      ))}
    </div>
  );
}
