import { Suspense } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { getProducts } from "@/features/products/services/products.service";
import { getCategoryFilterOptions } from "@/features/category/services/category.service";
import { ProductsInfinite } from "@/features/products/components/products-infinite";
import { ProductsBreadcrumb } from "@/features/products/components/products-breadcrumb";
import type { IApiProductsProduct } from "@/features/products/utils/products-response.interface";
import type { IProduct } from "@/types/product.interface";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  params: Record<string, string>;
}

function mapProduct(p: IApiProductsProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    price: p.price,
    originalPrice:
      p.discount > 0 && p.discount_type === "fixed"
        ? p.price + p.discount
        : p.discount > 0 && p.discount_type === "percent"
          ? p.price / (1 - p.discount / 100)
          : undefined,
    image: p.image_url,
    rating: p.rating,
    reviews: 0,
    badge: p.is_original ? "Original" : undefined,
    discountLabel:
      p.discount_type === "percent" && p.discount > 0
        ? `${p.discount}%`
        : undefined,
    delivery: p.delivery_date_text,
  };
}

export async function ProductsPage({ lang, dict, params }: IProps) {
  const [data, filterOptions] = await Promise.all([
    getProducts(params),
    getCategoryFilterOptions(params.query),
  ]);

  const initialProducts = data ? data.data.map(mapProduct) : [];
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
        <Suspense>
          <ProductsInfinite
            title={title}
            header={
              <ProductsBreadcrumb
                homeLabel={dict.breadcrumb.home}
                title={title}
                lang={lang}
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
            }}
            quickFiltersLabels={dict.nav.filters}
          />
        </Suspense>
      </main>
      <Footer dict={dict} />
    </>
  );
}
