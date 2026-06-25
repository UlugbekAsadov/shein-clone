import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { MobileHeader } from "@/shared/components/header/mobile-header";
import { MobileSearchBar } from "@/shared/components/header/mobile-search-bar";
import { Footer } from "@/shared/components/footer/footer";
import { PromoBanner } from "@/features/home/components/promo-banner";
import { HeroCarousel } from "@/features/home/components/hero-carousel/hero-carousel";
import { Categories } from "@/features/home/components/categories/categories";
import { ProductSections } from "@/features/home/components/product-sections/product-sections";
import { Stories } from "@/features/home/components/stories/stories";
import type { IBanner } from "@/features/home/utils/banner.interface";
import type { IMarketingBadge } from "@/features/home/utils/marketing-badge.interface";
import type { IProductSection } from "@/features/home/utils/product-section.interface";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  banners: IBanner[];
  marketingBadge: IMarketingBadge | null;
  productSections: IProductSection[];
  featuredShops: IApiFeaturedShop[];
}

export function HomePage({
  lang,
  dict,
  banners,
  marketingBadge,
  productSections,
  featuredShops,
}: IProps) {
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

        <HeroCarousel lang={lang} banners={banners} />
        <Categories
          lang={lang}
          title={dict.sections.shopByCategory}
          viewAllLabel={dict.sections.viewAll}
        />
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
        {/* <DiscountBanners discountLabel={dict.sections.discount} /> */}
      </main>

      <Footer dict={dict} />
    </>
  );
}
