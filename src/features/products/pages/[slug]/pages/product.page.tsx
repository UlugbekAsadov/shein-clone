"use client";

import { notFound } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProductBreadcrumb } from "@/features/products/pages/[slug]/components/product-breadcrumb";
import { ProductStickyBar } from "@/features/products/pages/[slug]/components/product-sticky-bar";
import { ProductInfoPanel } from "@/features/products/pages/[slug]/components/product-info/product-info-panel";
import { ProductShippingInfo } from "@/features/products/pages/[slug]/components/product-info/product-shipping-info";
import { ProductSellerCard } from "@/features/products/pages/[slug]/components/product-info/product-seller-card";
import { ProductReviewsSection } from "@/features/products/pages/[slug]/components/product-reviews/product-reviews-section";
import { SimilarProducts } from "@/features/products/pages/[slug]/components/similar-products";
import { RecommendedProducts } from "@/features/products/pages/[slug]/components/recommended-products";
import { ProductMobilePage } from "@/features/products/pages/[slug]/components/product-mobile/product-mobile-page";
import { ProductVariantProvider } from "@/features/products/pages/[slug]/providers/product-variant.provider";
import { ProductGalleryPanel } from "@/features/products/pages/[slug]/components/product-gallery-panel";
import { ProductPageSkeleton } from "@/features/products/pages/[slug]/components/product-page-skeleton/product-page-skeleton";
import { useProductDetail } from "@/features/products/pages/[slug]/hooks/use-product-detail";
import { useSimilarProducts } from "@/features/products/pages/[slug]/hooks/use-similar-products";
import { useRecommendedProducts } from "@/features/products/pages/[slug]/hooks/use-recommended-products";
import { useShopById } from "@/features/shop/hooks/use-shop-by-id";
import type {
  IProductComment,
  IProductFitStats,
} from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type {
  IFitStat,
  IReview,
} from "@/features/products/pages/[slug]/utils/review.interface";
import { ProductReviews } from "../components/product-reviews/product-reviews";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  slug: string;
}

function mapCommentToReview(comment: IProductComment): IReview {
  return {
    id: String(comment.id),
    user: comment.user.name,
    date: comment.created_at,
    rating: comment.rating,
    meta: comment.specs.map((spec, index) => ({
      id: `${comment.id}-${index}`,
      label: spec.label,
      value: spec.value,
    })),
    text: comment.content,
    images: comment.images,
    countryFlag: comment.country?.flag ?? "",
    countryLabel: comment.country?.name ?? "",
    helpful: comment.helpful_count,
    sellerResponse: comment.shop_reply
      ? {
          shopName: comment.shop_reply.shop.name,
          date: comment.shop_reply.created_at,
          text: comment.shop_reply.content,
        }
      : undefined,
  };
}

function mapFitStats(stats: IProductFitStats, dict: IDictionary): IFitStat[] {
  return [
    {
      id: "small",
      label: dict.product.fitStats.small,
      percent: stats.small_percentage,
    },
    {
      id: "true_to_size",
      label: dict.product.fitStats.trueToSize,
      percent: stats.true_to_size_percentage,
    },
    {
      id: "large",
      label: dict.product.fitStats.large,
      percent: stats.large_percentage,
    },
  ];
}

export function ProductPage({ lang, dict, slug }: IProps) {
  const { data: product, isPending } = useProductDetail(slug);
  const { data: shop = null } = useShopById(product?.shop_id ?? undefined);
  const { data: similarResult } = useSimilarProducts(product?.id);
  const { data: recommendedResult } = useRecommendedProducts(product?.id);

  if (isPending) {
    return (
      <>
        <Header lang={lang} dict={dict} isSticky={false} />
        <main className="flex-1">
          <ProductPageSkeleton />
        </main>
        <Footer dict={dict} />
      </>
    );
  }
  if (!product) notFound();

  const similarProducts = similarResult?.products ?? [];
  const recommendedProducts = recommendedResult?.products ?? [];

  const sellerFallbackHighlight = product.highlights.find((h) =>
    h.title.startsWith("Sold by"),
  );

  const fallbackImages = [product.image_url, ...product.additional_images];
  const reviews = product.latest_comments.map(mapCommentToReview);
  const fitStats = mapFitStats(product.fit_stats, dict);

  const breadcrumbItems = [
    { id: "home", label: dict.breadcrumb.home, href: `/${lang}/demo` },
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
                  {shop ? <ProductSellerCard shop={shop} /> : null}
                </div>

                {reviews.length > 0 && (
                  <div className="md:col-span-2">
                    <ProductReviews reviews={reviews} />
                  </div>
                )}
              </div>
            </ProductVariantProvider>

            <SimilarProducts
              products={similarProducts}
              countLabel={`${similarProducts.length}+ products`}
              lang={lang}
              autoFilter={similarResult?.autoFilter ?? null}
            />

            {recommendedProducts.length > 0 && (
              <RecommendedProducts
                products={recommendedProducts}
                countLabel={`${recommendedProducts.length}+ products`}
                lang={lang}
                autoFilter={recommendedResult?.autoFilter ?? null}
              />
            )}
          </div>
        </main>

        <Footer dict={dict} />
      </div>
    </>
  );
}
