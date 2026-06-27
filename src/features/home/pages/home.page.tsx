"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { MobileHeader } from "@/shared/components/header/mobile-header";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { Footer } from "@/shared/components/footer/footer";
import { PromoBanner } from "@/features/home/components/promo-banner";
import { HeroCarousel } from "@/features/home/components/hero-carousel/hero-carousel";
import { HeroCarouselSkeleton } from "@/features/home/components/hero-carousel/hero-carousel-skeleton";
import { Categories } from "@/features/home/components/categories/categories";
import { ProductSections } from "@/features/home/components/product-sections/product-sections";
import { ProductSectionsSkeleton } from "@/features/home/components/product-sections/product-sections-skeleton";
import { Stories } from "@/features/home/components/stories/stories";
import { useBanners } from "@/features/home/hooks/use-banners";
import { useMarketingBadge } from "@/features/home/hooks/use-marketing-badge";
import { useProductSections } from "@/features/home/hooks/use-product-sections";
import { useFeaturedShops } from "@/features/home/hooks/use-featured-shops";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function HomePage({ lang, dict }: IProps) {
  const { data: banners = [], isPending: isBannersPending } = useBanners();
  const { data: marketingBadge = null } = useMarketingBadge();
  const { data: productSections = [], isPending: isSectionsPending } =
    useProductSections();
  const { data: featuredShops = [] } = useFeaturedShops();

  return (
    <>
      <MobileHeader lang={lang} />
      <Header lang={lang} dict={dict} />

      <main className="flex-1 mt-10">
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

        {isBannersPending ? (
          <HeroCarouselSkeleton />
        ) : (
          <HeroCarousel lang={lang} banners={banners} />
        )}
        <Categories
          lang={lang}
          title={dict.sections.shopByCategory}
          viewAllLabel={dict.sections.viewAll}
        />
        {isSectionsPending ? (
          <ProductSectionsSkeleton />
        ) : (
          <ProductSections
            lang={lang}
            sections={productSections}
            featuredShops={featuredShops}
            viewAllLabel={dict.sections.viewAll}
            featuredShopsTitle={dict.sections.featuredShops}
            featuredShopsSubtitle={dict.sections.featuredSubtitle}
            followLabel={dict.sections.follow}
            followingLabel={dict.sections.following}
          />
        )}
      </main>

      <Footer dict={dict} />
    </>
  );
}
