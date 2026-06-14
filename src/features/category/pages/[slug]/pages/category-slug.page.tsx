import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import {
  getProductSection,
  getCategoryFilterOptions,
} from "@/features/category/services/category.service";
import { CategoryBreadcrumb } from "@/features/category/pages/[slug]/components/category-breadcrumb";
import { SectionProductsInfinite } from "@/features/category/pages/[slug]/components/section-products-infinite";
import type { IApiCategorySectionProduct } from "@/features/category/pages/[slug]/utils/category-section.interface";
import type { IProduct } from "@/types/product.interface";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

function computeOriginalPrice(price: number, discount: number, discountType: string): number | undefined {
  if (discount <= 0) return undefined;
  if (discountType === "percent") return price / (1 - discount / 100);
  if (discountType === "fixed") return price + discount;
  return undefined;
}

function mapProduct(p: IApiCategorySectionProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    price: p.price,
    originalPrice: computeOriginalPrice(p.price, p.discount, p.discount_type),
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

export async function CategorySlugPage({ lang, dict, slug }: IProps) {
  const [data, filterOptions] = await Promise.all([
    getProductSection(slug),
    getCategoryFilterOptions(),
  ]);

  if (!data) notFound();

  const initialProducts = data.products.map(mapProduct);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <Suspense>
          <SectionProductsInfinite
            slug={slug}
            title={data.section.name}
            header={
              <CategoryBreadcrumb title={data.section.name} lang={lang} />
            }
            dict={{
              tabs: dict.listing.tabs,
              toolbar: dict.listing.toolbar,
              filter: dict.listing.filter,
            }}
            quickFiltersLabels={dict.nav.filters}
            initialProducts={initialProducts}
            initialMeta={data.meta}
            filterOptions={filterOptions}
          />
        </Suspense>
      </main>

      <Footer dict={dict} />
    </>
  );
}
