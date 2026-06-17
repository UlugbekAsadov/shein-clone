import type { IProduct } from "@/types/product.interface";
import { ProductGrid } from "@/shared/components/product/product-grid";

interface IProps {
  products: IProduct[];
}

export function ProductMobileSimilar({ products }: IProps) {
  if (!products.length) return null;

  return (
    <div className="mt-5">
      <ProductGrid
        products={products}
        className="grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2"
      />
    </div>
  );
}
