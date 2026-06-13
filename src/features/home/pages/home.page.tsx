import { GraphUp } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { MobileHeader } from "@/shared/components/header/mobile-header";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { Footer } from "@/shared/components/footer/footer";
import {
  ECommerceBagBlueBag,
  FlameSolid,
} from "@/shared/components/icons/solid";
import { moreToExplore, trendingProducts } from "@/shared/mocks";
import { PromoBanner } from "@/features/home/components/promo-banner";
import { HeroCarousel } from "@/features/home/components/hero-carousel/hero-carousel";
import { Categories } from "@/features/home/components/categories/categories";
import { WomensFashion } from "@/features/home/components/womens-fashion";
import { FeaturedShops } from "@/features/home/components/featured-shops/featured-shops";
import { DiscountBanners } from "@/features/home/components/discount-banners/discount-banners";
import { ProductGroup } from "@/features/home/components/product-group/product-group";
import { Stories } from "@/features/home/components/stories/stories";
import type { IBanner } from "@/features/home/utils/banner.interface";
import type { IMarketingBadge } from "@/features/home/utils/marketing-badge.interface";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  banners: IBanner[];
  marketingBadge: IMarketingBadge | null;
}

export function HomePage({ lang, dict, banners, marketingBadge }: IProps) {
  return (
    <>
      <MobileHeader lang={lang} />
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        {marketingBadge && (
          <div className="hidden md:block">
            <PromoBanner badge={marketingBadge} />
          </div>
        )}
        <Stories />
        <MobileSearchBar
          lang={lang}
          placeholder={dict.header.searchPlaceholder}
          visualSearchDict={dict.visualSearch}
        />

        <HeroCarousel lang={lang} banners={banners} />
        <Categories
          lang={lang}
          title={dict.sections.shopByCategory}
          viewAllLabel={dict.sections.viewAll}
        />
        <ProductGroup
          title={dict.sections.trendingNow}
          subtitle={dict.sections.trendingSubtitle}
          viewAllLabel={dict.sections.viewAll}
          bgColor="#FF3C0614"
          products={trendingProducts}
          viewAllHref="#"
          Icon={GraphUp}
        />
        <WomensFashion
          title={dict.sections.womensFashion}
          subtitle={dict.sections.womensSubtitle}
          filtersLabel={dict.sections.filters}
        />
        <FeaturedShops
          title={dict.sections.featuredShops}
          subtitle={dict.sections.featuredSubtitle}
          viewAllLabel={dict.sections.viewAll}
          followLabel={dict.sections.follow}
          followingLabel={dict.sections.following}
        />
        <ProductGroup
          title={dict.sections.moreToExplore}
          subtitle={dict.sections.moreSubtitle}
          viewAllLabel={dict.sections.viewAll}
          bgColor="#FF3C0614"
          products={moreToExplore}
          viewAllHref="#"
          Icon={ECommerceBagBlueBag}
        />
        <ProductGroup
          title={dict.sections.moreToExplore}
          subtitle={dict.sections.moreSubtitle}
          viewAllLabel={dict.sections.viewAll}
          products={moreToExplore}
          viewAllHref="#"
          Icon={FlameSolid}
          bgImage="/images/hot-deals-background.webp"
          textColor="#FFFFFF"
          descriptionColor="#FFFFFF"
          timer={new Date("2026-05-29T00:00:00Z")}
        />
        <DiscountBanners discountLabel={dict.sections.discount} />
      </main>

      <Footer dict={dict} />
    </>
  );
}
