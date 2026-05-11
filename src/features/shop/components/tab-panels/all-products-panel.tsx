import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import { ShopProductListing } from "../shop-product-listing";

interface IProps {
  products: IProduct[];
  dict: IDictionary;
}

export function AllProductsPanel({ products, dict }: IProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-6">
      <ShopProductListing products={products} dict={dict} />
    </div>
  );
}
