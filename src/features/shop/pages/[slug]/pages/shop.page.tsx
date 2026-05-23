import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { Stories } from "@/features/home/components/stories/stories";
import { shopDetail } from "@/features/shop/pages/[slug]/mocks/shop-detail.mocks";
import { shopCoupons } from "@/features/shop/pages/[slug]/mocks/coupon.mocks";
import { shopAboutContent } from "@/features/shop/pages/[slug]/mocks/about-content.mocks";
import { ShopBreadcrumb } from "@/features/shop/pages/[slug]/components/shop-breadcrumb";
import { ShopProfile } from "@/features/shop/pages/[slug]/components/shop-profile/shop-profile";
import { ShopContent } from "@/features/shop/pages/[slug]/components/shop-content";
import { ShopMobilePage } from "@/features/shop/pages/[slug]/components/shop-mobile/shop-mobile-page";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

export function ShopPage({ lang, dict }: IProps) {
  const shop = shopDetail;
  const products = [...trendingProducts, ...womensFashion].slice(0, 16);
  const coupons = shopCoupons;
  const about = shopAboutContent;

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
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
      </main>

      <Footer dict={dict} />
    </>
  );
}
