import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { Header } from "@/components/common/header/header";
import { CategoryNav } from "@/components/common/category/category-nav";
import { Footer } from "@/components/common/footer/footer";
import { ProductPreviewGallery } from "@/components/common/product/product-preview/product-preview-gallery";
import { trendingProducts, womensFashion } from "@/lib/mock-data";
import { ProductBreadcrumb } from "./_components/product-breadcrumb";
import { ProductStickyBar } from "./_components/product-sticky-bar";
import { ProductInfoPanel } from "./_components/product-info/product-info-panel";
import { ProductShippingInfo } from "./_components/product-info/product-shipping-info";
import { ProductSellerCard } from "./_components/product-info/product-seller-card";
import { ProductDescriptionSection } from "./_components/product-info/product-description-section";
import { ProductReviewsSection } from "./_components/product-reviews/product-reviews-section";
import { SimilarProducts } from "./_components/similar-products";
import { productBreadcrumbTrail } from "./_lib/mocks/breadcrumb.mocks";
import { productDetailMock } from "./_lib/mocks/product-detail.mocks";
import { sellerCardMock } from "./_lib/mocks/seller-card.mocks";
import { fitStatsMock, reviewMediaMock, reviewsMock } from "./_lib/mocks/review.mocks";

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
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-6">
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
