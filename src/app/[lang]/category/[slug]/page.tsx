import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { CategoryBreadcrumb } from "@/features/category/components/category-breadcrumb";

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
        <ListingShell
          header={<CategoryBreadcrumb />}
          products={products}
          dict={{
            tabs: dict.listing.tabs,
            toolbar: dict.listing.toolbar,
            filter: dict.listing.filter,
          }}
          quickFiltersLabels={dict.nav.filters}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
