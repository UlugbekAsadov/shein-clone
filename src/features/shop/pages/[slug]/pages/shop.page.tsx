import { notFound } from "next/navigation";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ShopProfile } from "@/features/shop/pages/[slug]/components/shop-profile/shop-profile";
import { ShopContent } from "@/features/shop/pages/[slug]/components/shop-content";
import { ShopMobilePage } from "@/features/shop/pages/[slug]/components/shop-mobile/shop-mobile-page";
import {
  getShopHeader,
  getShopAbout,
  getShopPromoCodes,
  getShopProducts,
  getShopFilterOptions,
} from "@/features/shop/services/shop.service";
import { getShopStories } from "@/features/shop/services/shop-stories.service";
import { getShopHighlights } from "@/features/shop/services/shop-highlight.service";
import { ShopHighlights } from "@/features/shop/pages/[slug]/components/shop-highlights/shop-highlights";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

export async function ShopPage({ lang, dict, slug }: IProps) {
  const apiShop = await getShopHeader(slug);
  if (!apiShop) notFound();
  console.log({ apiShop });

  const [
    stories,
    apiAbout,
    apiPromoCodes,
    apiProducts,
    apiFilterOptions,
    apiHighlights,
  ] = await Promise.all([
    getShopStories(apiShop.id),
    getShopAbout(apiShop.id),
    getShopPromoCodes(apiShop.id),
    getShopProducts(apiShop.id),
    getShopFilterOptions(apiShop.id),
    getShopHighlights(apiShop.id),
  ]);
  const activeStories = stories.filter((s) => s.is_active);
  const activeStoriesCount = activeStories.length;
  const viewedStoriesCount = activeStories.filter((s) => s.is_viewed).length;

  const products = apiProducts?.data ?? [];
  const initialMeta = apiProducts?.meta ?? {
    total: 0,
    current_page: 1,
    last_page: 0,
    per_page: 10,
  };
  const activeHighlights = apiHighlights.filter((h) => h.is_active);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <ShopMobilePage
          shop={apiShop}
          products={products}
          coupons={apiPromoCodes}
          about={apiAbout}
          highlights={activeHighlights}
          dict={dict}
          shopId={apiShop.id}
          lang={lang}
          activeStoriesCount={activeStoriesCount}
          viewedStoriesCount={viewedStoriesCount}
        />

        <div className="hidden space-y-6 py-6 md:block">
          <div className="mx-auto max-w-360 px-6">
            <ShopProfile
              shop={apiShop}
              dict={dict}
              activeStoriesCount={activeStoriesCount}
              viewedStoriesCount={viewedStoriesCount}
            />
          </div>

          <ShopHighlights shopId={apiShop.id} />

          <ShopContent
            shop={apiShop}
            products={products}
            initialMeta={initialMeta}
            filterOptions={apiFilterOptions}
            coupons={apiPromoCodes}
            about={apiAbout}
            dict={dict}
            lang={lang}
            shopId={apiShop.id}
          />
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
