import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { shopCoupons } from "@/features/shop/pages/[slug]/mocks/coupon.mocks";
import { shopAboutContent } from "@/features/shop/pages/[slug]/mocks/about-content.mocks";
// import { ShopBreadcrumb } from "@/features/shop/pages/[slug]/components/shop-breadcrumb";
import { ShopProfile } from "@/features/shop/pages/[slug]/components/shop-profile/shop-profile";
import { ShopContent } from "@/features/shop/pages/[slug]/components/shop-content";
import { ShopMobilePage } from "@/features/shop/pages/[slug]/components/shop-mobile/shop-mobile-page";
import { getShopHeader, getShopAbout } from "@/features/shop/services/shop.service";
import { getShopStories } from "@/features/shop/services/shop-stories.service";
import { mapApiShopToDetail } from "@/features/shop/pages/[slug]/utils/shop-detail.mapper";
import { mapApiShopAboutToContent } from "@/features/shop/pages/[slug]/utils/about-content.mapper";
import { ShopHighlights } from "@/features/shop/pages/[slug]/components/shop-highlights/shop-highlights";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

export async function ShopPage({ lang, dict, slug }: IProps) {
  const apiShop = await getShopHeader(slug);
  if (!apiShop) notFound();

  const [stories, apiAbout] = await Promise.all([
    getShopStories(apiShop.id),
    getShopAbout(apiShop.id),
  ]);
  const activeStories = stories.filter((s) => s.is_active);
  const activeStoriesCount = activeStories.length;
  const viewedStoriesCount = activeStories.filter((s) => s.is_viewed).length;

  const shop = mapApiShopToDetail(apiShop, lang, dict);
  const products = [...trendingProducts, ...womensFashion].slice(0, 16);
  const coupons = shopCoupons;
  const about = apiAbout
    ? mapApiShopAboutToContent(apiAbout, dict)
    : shopAboutContent;

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
          {/* <div className="mx-auto max-w-360 px-6">
            <ShopBreadcrumb />
          </div> */}

          <div className="mx-auto max-w-360 px-6">
            <ShopProfile
              shop={shop}
              shopId={apiShop.id}
              activeStoriesCount={activeStoriesCount}
              viewedStoriesCount={viewedStoriesCount}
              followLabel={dict.shop.follow}
              followingLabel={dict.shop.following}
            />
          </div>

          <ShopHighlights shopId={apiShop.id} />

          <ShopContent
            shop={shop}
            products={products}
            coupons={coupons}
            about={about}
            dict={dict}
            lang={lang}
          />
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
