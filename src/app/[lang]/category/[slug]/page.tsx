import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/common/header/header";
import { CategoryNav } from "@/components/common/category/category-nav";
import { Footer } from "@/components/common/footer/footer";
import { ProductGrid } from "@/components/common/product/product-grid";
import { trendingProducts, womensFashion } from "@/lib/mock-data";
import { CategoryBreadcrumb } from "./_components/category-breadcrumb";
import { CategoryTabs } from "./_components/category-tabs";
import { CategoryToolbar } from "./_components/category-toolbar";
import { FilterSidebar } from "./_components/filter-sidebar/filter-sidebar";

export default async function CategoryPage({
  params,
}: PageProps<"/[lang]/category/[slug]">) {
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
        <div className="mx-auto max-w-[1440px] px-6 py-6">
          <CategoryBreadcrumb />
          <div className="mt-4">
            <CategoryTabs
              similarLabel={dict.category.tabs.similar}
              dealsLabel={dict.category.tabs.deals}
            />
          </div>

          <div className="mt-6 flex gap-8">
            <FilterSidebar
              dict={dict.category.filter}
              quickFiltersLabels={dict.nav.filters}
            />

            <div className="flex-1">
              <CategoryToolbar
                productFoundLabel={dict.category.toolbar.productFound}
                mostPopularLabel={dict.category.toolbar.mostPopular}
                priceLabel={dict.category.toolbar.price}
                sortLabels={{
                  newest: dict.category.toolbar.sortNewest,
                  priceLow: dict.category.toolbar.sortPriceLow,
                  priceHigh: dict.category.toolbar.sortPriceHigh,
                  rating: dict.category.toolbar.sortRating,
                }}
              />
              <ProductGrid
                products={products}
                className="mt-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
