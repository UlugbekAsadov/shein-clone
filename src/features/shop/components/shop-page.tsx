import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProduct } from "@/types/product.interface";
import type { IShopDetail } from "@/features/shop/interfaces/shop-detail.interface";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";
import type { IAboutContent } from "@/features/shop/interfaces/about-content.interface";
import { ShopBreadcrumb } from "./shop-breadcrumb";
import { ShopProfile } from "./shop-profile/shop-profile";
import { ShopContent } from "./shop-content";
import { ShopMobilePage } from "./shop-mobile/shop-mobile-page";
import { Stories } from "@/features/home/components/stories/stories";

interface IProps {
  shop: IShopDetail;
  products: IProduct[];
  coupons: ICoupon[];
  about: IAboutContent;
  dict: IDictionary;
}

export function ShopPage({ shop, products, coupons, about, dict }: IProps) {
  return (
    <>
      <ShopMobilePage
        shop={shop}
        products={products}
        coupons={coupons}
        about={about}
        dict={dict}
      />

      <div className="hidden space-y-6 py-6 md:block">
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

        <Stories />

        <ShopContent
          shop={shop}
          products={products}
          coupons={coupons}
          about={about}
          dict={dict}
        />
      </div>
    </>
  );
}
