import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { CategoryBreadcrumb } from "@/features/category/[slug]/components/category-breadcrumb";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

export function CategorySlugPage({ lang, dict, slug }: IProps) {
  const products = [...trendingProducts, ...womensFashion].slice(0, 16);
  const title = slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <ListingShell
          title={title}
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
