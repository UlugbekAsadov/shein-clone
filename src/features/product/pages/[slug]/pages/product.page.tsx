import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProductBreadcrumb } from "@/features/product/pages/[slug]/components/product-breadcrumb";
import { ProductStickyBar } from "@/features/product/pages/[slug]/components/product-sticky-bar";
import { ProductInfoPanel } from "@/features/product/pages/[slug]/components/product-info/product-info-panel";
import { ProductShippingInfo } from "@/features/product/pages/[slug]/components/product-info/product-shipping-info";
import { ProductSellerCard } from "@/features/product/pages/[slug]/components/product-info/product-seller-card";
import { ProductSellerFallback } from "@/features/product/pages/[slug]/components/product-info/product-seller-fallback";
import { ProductReviewsSection } from "@/features/product/pages/[slug]/components/product-reviews/product-reviews-section";
import { SimilarProducts } from "@/features/product/pages/[slug]/components/similar-products";
import { RecommendedProducts } from "@/features/product/pages/[slug]/components/recommended-products";
import { ProductMobilePage } from "@/features/product/pages/[slug]/components/product-mobile/product-mobile-page";
import { ProductVariantProvider } from "@/features/product/pages/[slug]/providers/product-variant.provider";
import { ProductGalleryPanel } from "@/features/product/pages/[slug]/components/product-gallery-panel";
import {
  getProductDetail,
  getSimilarProducts,
  getRecommendedProducts,
} from "@/features/product/services/products-detail.service";
import { getShopById } from "@/features/shop/services/shop.service";
import type {
  IProductComment,
  IProductFitStats,
} from "@/features/product/pages/[slug]/utils/product-detail.interface";
import type {
  IFitStat,
  IReview,
} from "@/features/product/pages/[slug]/utils/review.interface";
import { ProductReviews } from "../components/product-reviews/product-reviews";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

function mapCommentToReview(comment: IProductComment): IReview {
  return {
    id: String(comment.id),
    user: comment.user_name,
    date: comment.created_at,
    rating: comment.rating,
    meta: [
      { id: "color", label: "Color", value: comment.color },
      { id: "size", label: "Size", value: comment.size },
      { id: "fit", label: "Fit", value: comment.fit.replace(/_/g, " ") },
    ],
    text: comment.content,
    images: comment.images,
    countryFlag: "",
    countryLabel: comment.country,
    helpful: comment.helpful_count,
    sellerResponse: comment.reply
      ? { shopName: "", date: comment.created_at, text: comment.reply }
      : undefined,
  };
}

function mapFitStats(stats: IProductFitStats): IFitStat[] {
  return [
    { id: "small", label: "Small", percent: stats.small_percentage },
    {
      id: "true_to_size",
      label: "True to size",
      percent: stats.true_to_size_percentage,
    },
    { id: "large", label: "Large", percent: stats.large_percentage },
  ];
}

export async function ProductPage({ lang, dict, slug }: IProps) {
  const product = await getProductDetail(slug);
  if (!product) notFound();

  const [shop, similarProducts, recommendedProducts] = await Promise.all([
    product.shop_id ? getShopById(product.shop_id) : Promise.resolve(null),
    getSimilarProducts(product.id),
    getRecommendedProducts(product.id),
  ]);

  const sellerFallbackHighlight = product.highlights.find((h) =>
    h.title.startsWith("Sold by"),
  );

  const fallbackImages = [product.image_url, ...product.additional_images];
  const reviews = product.latest_comments.map(mapCommentToReview);
  const fitStats = mapFitStats(product.fit_stats);

  const breadcrumbItems = [
    { id: "home", label: dict.breadcrumb.home, href: `/${lang}` },
    { id: "current", label: product.title },
  ];

  return (
    <>
      <ProductMobilePage
        product={product}
        shop={shop}
        sellerFallbackHighlight={sellerFallbackHighlight}
        fitStats={fitStats}
        reviewMedia={product.review_images_gallery}
        reviews={reviews}
        similar={similarProducts.slice(0, 4)}
        followLabel={dict.shop.follow}
        followingLabel={dict.shop.following}
      />

      <div className="hidden md:contents">
        <ProductStickyBar product={product} />
        <Header lang={lang} dict={dict} isSticky={false} />

        <main className="flex-1">
          <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
            <ProductBreadcrumb items={breadcrumbItems} />

            <ProductVariantProvider
              variants={product.variant_clothes}
              fallbackImages={fallbackImages}
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-8">
                  <ProductGalleryPanel alt={product.title} />

                  <ProductReviewsSection
                    lang={lang}
                    slug={slug}
                    totalLabel={String(product.reviews_count)}
                    rating={product.rating}
                    fitStats={fitStats}
                    media={product.review_images_gallery}
                    reviews={reviews}
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <ProductInfoPanel product={product} />
                  <ProductShippingInfo highlights={product.highlights} />
                  {shop ? (
                    <ProductSellerCard shop={shop} />
                  ) : (
                    sellerFallbackHighlight && (
                      <ProductSellerFallback
                        highlight={sellerFallbackHighlight}
                      />
                    )
                  )}
                </div>

                {reviews.length > 0 && (
                  <div className="md:col-span-2">
                    <ProductReviews reviews={reviews} />
                  </div>
                )}
              </div>
            </ProductVariantProvider>

            <SimilarProducts products={similarProducts} countLabel={`${similarProducts.length}+ products`} />

            {recommendedProducts.length > 0 && (
              <RecommendedProducts products={recommendedProducts} countLabel={`${recommendedProducts.length}+ products`} />
            )}
          </div>
        </main>

        <Footer dict={dict} />
      </div>
    </>
  );
}
