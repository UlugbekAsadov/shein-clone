import type { IProduct } from "@/types/product.interface";
import { ProductSliderCard } from "./product-slider-card";

interface IProps {
  products: IProduct[];
  variant?: "default" | "dark";
}

export function ProductHorizontalList({ products, variant }: IProps) {
  return (
    <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[72%] shrink-0 snap-center first:ml-2 last:mr-2"
        >
          <ProductSliderCard product={p} variant={variant} />
        </div>
      ))}
    </div>
  );
}
