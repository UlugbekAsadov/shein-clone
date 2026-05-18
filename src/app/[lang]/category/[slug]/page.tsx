import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ListingShell } from "@/shared/components/listing/listing-shell";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { CategoryBreadcrumb } from "@/features/category/components/category-breadcrumb";

export default async function CategoryPage({
  params,
}: PageProps<"/[lang]/category/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
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
