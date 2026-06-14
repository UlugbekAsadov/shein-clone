import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { getProductSection } from "@/features/category/services/category.service";
import { CategoryBreadcrumb } from "@/features/category/pages/[slug]/components/category-breadcrumb";
import { SectionProductsInfinite } from "@/features/category/pages/[slug]/components/section-products-infinite";
import type { IApiCategorySectionProduct } from "@/features/category/pages/[slug]/utils/category-section.interface";
import type { IProduct } from "@/types/product.interface";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

function mapProduct(p: IApiCategorySectionProduct): IProduct {
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    subtitle: "",
    prices: { USD: 0, UZS: p.price, RUB: 0 },
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
  const data = await getProductSection(slug);
  if (!data) notFound();

  const initialProducts = data.products.map(mapProduct);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <SectionProductsInfinite
          slug={slug}
          title={data.section.name}
          header={<CategoryBreadcrumb />}
          dict={{
            tabs: dict.listing.tabs,
            toolbar: dict.listing.toolbar,
            filter: dict.listing.filter,
          }}
          quickFiltersLabels={dict.nav.filters}
          initialProducts={initialProducts}
          initialMeta={data.meta}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
