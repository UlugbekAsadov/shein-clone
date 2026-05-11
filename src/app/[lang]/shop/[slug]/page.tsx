import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { ShopPage } from "@/features/shop/components/shop-page";
import { shopDetail } from "@/features/shop/mocks/shop-detail.mocks";
import { shopCoupons } from "@/features/shop/mocks/coupon.mocks";
import { shopAboutContent } from "@/features/shop/mocks/about-content.mocks";

export default async function Shop({
  params,
}: PageProps<"/[lang]/shop/[slug]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const products = [...trendingProducts, ...womensFashion].slice(0, 16);

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
        <ShopPage
          shop={shopDetail}
          products={products}
          coupons={shopCoupons}
          about={shopAboutContent}
          dict={dict}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
