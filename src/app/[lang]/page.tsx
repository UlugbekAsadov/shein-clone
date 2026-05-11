import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/common/header/header";
import { CategoryNav } from "@/components/common/category/category-nav";
import { Footer } from "@/components/common/footer";
import { PromoBanner } from "./_components/promo-banner";
import { BrandStrip } from "./_components/brand-strip";
import { HeroCarousel } from "./_components/hero-carousel";
import { ShopByCategory } from "./_components/shop-by-category";
import { TrendingNow } from "./_components/trending-now";
import { WomensFashion } from "./_components/womens-fashion";
import { FeaturedShops } from "./_components/featured-shops";
import { MoreToExplore } from "./_components/more-to-explore";
import { HotDeals } from "./_components/hot-deals";
import { DiscountBanners } from "./_components/discount-banners";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />
      <CategoryNav
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
