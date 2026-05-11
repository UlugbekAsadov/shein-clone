import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { PromoBanner } from "@/features/home/components/promo-banner";
import { BrandStrip } from "@/features/home/components/brand-strip";
import { HeroCarousel } from "@/features/home/components/hero-carousel";
import { ShopByCategory } from "@/features/home/components/shop-by-category";
import { TrendingNow } from "@/features/home/components/trending-now";
import { WomensFashion } from "@/features/home/components/womens-fashion";
import { FeaturedShops } from "@/features/home/components/featured-shops";
import { MoreToExplore } from "@/features/home/components/more-to-explore";
import { HotDeals } from "@/features/home/components/hot-deals";
import { DiscountBanners } from "@/features/home/components/discount-banners";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />
      <CategoryNav
        lang={lang}
        categoriesLabel={dict.nav.categories}
        picksTitle={dict.categoryMenu.picksForYou}
        featuredTitle={dict.categoryMenu.featured}
        filters={dict.nav.filters}
      />

      <main className="flex-1">
        <PromoBanner
          label={dict.promo.label}
          text={dict.promo.text}
          cta={dict.promo.cta}
        />
        <BrandStrip />
        <HeroCarousel />
        <ShopByCategory
          lang={lang}
          title={dict.sections.shopByCategory}
          viewAllLabel={dict.sections.viewAll}
        />
        <TrendingNow
          title={dict.sections.trendingNow}
          subtitle={dict.sections.trendingSubtitle}
          viewAllLabel={dict.sections.viewAll}
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
        <MoreToExplore
          title={dict.sections.moreToExplore}
          subtitle={dict.sections.moreSubtitle}
          viewAllLabel={dict.sections.viewAll}
        />
        <HotDeals
          title={dict.sections.hotDeals}
          viewAllLabel={dict.sections.viewAll}
        />
        <DiscountBanners discountLabel={dict.sections.discount} />
      </main>

      <Footer dict={dict} />
    </>
  );
}
