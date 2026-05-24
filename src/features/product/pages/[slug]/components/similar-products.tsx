import { AltArrowRight } from "@solar-icons/react/ssr";
import { ProductGrid } from "@/shared/components/product/product-grid";
import type { IProduct } from "@/types/product.interface";

interface IProps {
  products: IProduct[];
  countLabel: string;
}

export function SimilarProducts({ products, countLabel }: IProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">Similar Products</h2>
          <p className="text-xs text-muted-foreground">{countLabel}</p>
        </div>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          View all
          <AltArrowRight className="size-4" weight="Outline" />
        </button>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
