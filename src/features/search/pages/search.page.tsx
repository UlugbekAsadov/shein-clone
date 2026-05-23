import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { ListingPageHeader } from "@/shared/components/listing/listing-page-header";
import { trendingProducts, womensFashion } from "@/shared/mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  query: string;
}

export function SearchPage({ lang, dict, query }: IProps) {
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
