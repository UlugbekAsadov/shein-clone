import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/common/header/header";
import { CategoryNav } from "@/components/common/category/category-nav";
import { Footer } from "@/components/common/footer/footer";
import { ListingShell } from "@/components/common/listing/listing-shell";
import { ListingPageHeader } from "@/components/common/listing/listing-page-header";
import { trendingProducts, womensFashion } from "@/lib/mock-data";

export default async function SearchPage({
  params,
  searchParams,
}: PageProps<"/[lang]/search">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";

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
          header={
            <ListingPageHeader
              title={query}
              subtitle={dict.listing.search.resultsFound}
              productFoundLabel={dict.listing.toolbar.productFound}
            />
          }
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
