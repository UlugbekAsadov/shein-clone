"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { useProducts } from "@/features/products/hooks/use-products";
import { useCategoryFilterOptions } from "@/features/category/hooks/use-category-filter-options";
import { ProductsInfinite } from "@/features/products/components/products-infinite";
import { ProductsBreadcrumb } from "@/features/products/components/products-breadcrumb";
import { ProductsPageSkeleton } from "@/features/products/components/products-page-skeleton";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  params: Record<string, string>;
}

export function ProductsPage({ lang, dict, params }: IProps) {
  const { data = null, isPending } = useProducts(params);
  const { data: filterOptions = null } = useCategoryFilterOptions(params.query);

  const initialProducts = data ? data.data : [];
  const initialMeta = data?.meta ?? {
    total: 0,
    current_page: 1,
    last_page: 1,
    per_page: 20,
  };

  const title = dict.sections.viewAll;

  return (
    <>
      <Header lang={lang} dict={dict} />
      <main className="flex-1">
        {isPending && <ProductsPageSkeleton />}
        {!isPending && (
          <ProductsInfinite
            title={title}
            header={
              <ProductsBreadcrumb
                homeLabel={dict.breadcrumb.home}
                title={title}
                lang={lang}
                categories={filterOptions?.categories ?? []}
              />
            }
            initialProducts={initialProducts}
            initialMeta={initialMeta}
            initialParams={params}
            filterOptions={filterOptions}
            dict={{
              tabs: dict.listing.tabs,
              toolbar: dict.listing.toolbar,
              filter: dict.listing.filter,
              adult: dict.listing.adult,
            }}
            quickFiltersLabels={dict.nav.filters}
          />
        )}
      </main>
      <Footer dict={dict} />
    </>
  );
}
