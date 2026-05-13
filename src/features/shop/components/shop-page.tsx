import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import type { IAboutContent } from "@/features/shop/interfaces/about-content.interface";
import { BrandStrip } from "@/features/home/components/brand-strip/brand-strip";
import { ShopBreadcrumb } from "./shop-breadcrumb";
import { ShopProfile } from "./shop-profile/shop-profile";
import { ShopContent } from "./shop-content";

interface IProps {
  shop: IShopDetail;
  products: IProduct[];
  coupons: ICoupon[];
  about: IAboutContent;
  dict: IDictionary;
}

export function ShopPage({ shop, products, coupons, about, dict }: IProps) {
  return (
    <div className="space-y-6 py-6">
      <div className="mx-auto max-w-360 px-6">
        <ShopBreadcrumb />
      </div>

      <div className="mx-auto max-w-360 px-6">
        <ShopProfile
          shop={shop}
          followLabel={dict.shop.follow}
          followingLabel={dict.shop.following}
        />
      </div>

      <BrandStrip />

      <ShopContent
        shop={shop}
        products={products}
        coupons={coupons}
        about={about}
        dict={dict}
      />
    </div>
  );
}
