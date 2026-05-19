import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { ListingPageHeader } from "@/shared/components/listing/listing-page-header";
import { trendingProducts, womensFashion } from "@/shared/mocks";

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

      <main className="flex-1">
        <ListingShell
          title={query}
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
