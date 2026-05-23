import type { IProduct } from "@/types/product.interface";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ListingFilterChips } from "@/shared/components/listing/listing-mobile-header/listing-filter-chips";

interface IProps {
  products: IProduct[];
  priceLabel: string;
  applyLabel: string;
  filterDict: {
    size: string;
    color: string;
    priceRange: string;
    priceTo: string;
    brands: string;
  };
}

export function ShopMobileAllProducts({
  products,
  priceLabel,
  applyLabel,
  filterDict,
}: IProps) {
  return (
    <div className="flex flex-col gap-3">
      <ListingFilterChips
        priceLabel={priceLabel}
        applyLabel={applyLabel}
        dict={filterDict}
      />

      <div className="px-4">
        <ProductGrid
          products={products}
          className="grid-cols-2 gap-3"
        />
      </div>
    </div>
  );
}
