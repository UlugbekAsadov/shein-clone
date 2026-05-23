import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import { CouponsStrip } from "../coupons-strip/coupons-strip";
import { ShopProductListing } from "../shop-product-listing";

interface IProps {
  coupons: ICoupon[];
  products: IProduct[];
  dict: IDictionary;
}

export function DealsOffersPanel({ coupons, products, dict }: IProps) {
  return (
    <div className="mx-auto max-w-360 space-y-6 px-6">
      <CouponsStrip
        coupons={coupons}
        couponLabel={dict.shop.coupons.label}
        daysLeftLabel={dict.shop.coupons.daysLeft}
        copyLabel={dict.shop.coupons.copy}
        copiedLabel={dict.shop.coupons.copied}
        minOrderLabel={dict.shop.coupons.minOrder}
      />
      <ShopProductListing products={products} dict={dict} />
    </div>
  );
}
