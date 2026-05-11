import type { IProduct } from "@/types/product.interface";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

interface IProps {
  products: IProduct[];
  className?: string;
  variant?: "default" | "dark";
}

export function ProductGrid({ products, className, variant }: IProps) {
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
