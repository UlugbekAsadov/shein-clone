import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProductPreviewGallery } from "@/shared/components/product/product-preview/product-preview-dialog/product-preview-gallery";
import { trendingProducts, womensFashion } from "@/shared/mocks";
import { ProductBreadcrumb } from "@/features/product/pages/[slug]/components/product-breadcrumb";
import { ProductStickyBar } from "@/features/product/pages/[slug]/components/product-sticky-bar";
import { ProductInfoPanel } from "@/features/product/pages/[slug]/components/product-info/product-info-panel";
import { ProductShippingInfo } from "@/features/product/pages/[slug]/components/product-info/product-shipping-info";
import { ProductSellerCard } from "@/features/product/pages/[slug]/components/product-info/product-seller-card";
import { ProductReviewsSection } from "@/features/product/pages/[slug]/components/product-reviews/product-reviews-section";
import { SimilarProducts } from "@/features/product/pages/[slug]/components/similar-products";
import { ProductMobilePage } from "@/features/product/pages/[slug]/components/product-mobile/product-mobile-page";
import { productBreadcrumbTrail } from "@/features/product/pages/[slug]/mocks/breadcrumb.mocks";
import { productDetailMock } from "@/features/product/pages/[slug]/mocks/product-detail.mocks";
import { sellerCardMock } from "@/features/product/pages/[slug]/mocks/seller-card.mocks";
import {
  fitStatsMock,
  reviewMediaMock,
  reviewsMock,
} from "@/features/product/pages/[slug]/mocks/review.mocks";
import { ProductReviews } from "../components/product-reviews/product-reviews";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

export function ProductPage({ lang, dict, slug }: IProps) {
  const product = productDetailMock;
  const similar = [...trendingProducts, ...womensFashion].slice(0, 10);

  return (
    <>
      <ProductMobilePage
        product={product}
        fitStats={fitStatsMock}
        reviewMedia={reviewMediaMock}
        reviews={reviewsMock}
        similar={similar.slice(0, 4)}
        seller={sellerCardMock}
        followLabel={dict.shop.follow}
        followingLabel={dict.shop.following}
      />

      <div className="hidden md:contents">
        <ProductStickyBar product={product} />
        <Header lang={lang} dict={dict} isSticky={false} />

        <main className="flex-1">
          <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
            <ProductBreadcrumb items={productBreadcrumbTrail} />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
              </div>

              <div className="md:col-span-2">
                <ProductReviews reviews={reviewsMock} />
              </div>
            </div>

            <SimilarProducts products={similar} countLabel="3300+ products" />
          </div>
        </main>

        <Footer dict={dict} />
      </div>
    </>
  );
}
