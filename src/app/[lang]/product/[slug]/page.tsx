import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { ProductPreviewGallery } from "@/shared/components/product/product-preview/product-preview-gallery";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { ProductBreadcrumb } from "@/features/product/components/product-breadcrumb";
import { ProductStickyBar } from "@/features/product/components/product-sticky-bar";
import { ProductInfoPanel } from "@/features/product/components/product-info/product-info-panel";
import { ProductShippingInfo } from "@/features/product/components/product-info/product-shipping-info";
import { ProductSellerCard } from "@/features/product/components/product-info/product-seller-card";
import { ProductDescriptionSection } from "@/features/product/components/product-info/product-description-section";
import { ProductReviewsSection } from "@/features/product/components/product-reviews/product-reviews-section";
import { SimilarProducts } from "@/features/product/components/similar-products";
import { productBreadcrumbTrail } from "@/features/product/mocks/breadcrumb.mocks";
import { productDetailMock } from "@/features/product/mocks/product-detail.mocks";
import { sellerCardMock } from "@/features/product/mocks/seller-card.mocks";
import {
  fitStatsMock,
  reviewMediaMock,
  reviewsMock,
} from "@/features/product/mocks/review.mocks";

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/product/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const product = productDetailMock;
  const similar = [...trendingProducts, ...womensFashion].slice(0, 10);

  return (
    <>
      <ProductStickyBar product={product} />
      <Header lang={lang} dict={dict} />
      <CategoryNav
        lang={lang}
        categoriesLabel={dict.nav.categories}
        picksTitle={dict.categoryMenu.picksForYou}
        featuredTitle={dict.categoryMenu.featured}
        filters={dict.nav.filters}
      />

      <main className="flex-1">
        <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
          <ProductBreadcrumb items={productBreadcrumbTrail} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              <ProductPreviewGallery
                images={product.gallery}
                alt={product.title}
              />
              <ProductReviewsSection
                lang={lang}
                slug={slug}
                totalLabel="100+"
                rating={product.rating}
                fitStats={fitStatsMock}
                media={reviewMediaMock}
                reviews={reviewsMock}
              />
            </div>

            <div className="flex flex-col gap-6">
              <ProductInfoPanel product={product} />
              <ProductShippingInfo />
              <ProductSellerCard seller={sellerCardMock} />
              <ProductDescriptionSection product={product} />
            </div>
          </div>

          <SimilarProducts products={similar} countLabel="3300+ products" />
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
