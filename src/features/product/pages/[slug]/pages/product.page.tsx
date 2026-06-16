import { notFound } from "next/navigation";
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
import { ProductSellerFallback } from "@/features/product/pages/[slug]/components/product-info/product-seller-fallback";
import { ProductReviewsSection } from "@/features/product/pages/[slug]/components/product-reviews/product-reviews-section";
import { SimilarProducts } from "@/features/product/pages/[slug]/components/similar-products";
import { ProductMobilePage } from "@/features/product/pages/[slug]/components/product-mobile/product-mobile-page";
import { getProductDetail } from "@/features/product/services/products-detail.service";
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

  const shop = product.shop_id ? await getShopById(product.shop_id) : null;
  const sellerFallbackHighlight = product.highlights.find((h) =>
    h.title.startsWith("Sold by"),
  );

  const gallery = [product.image_url, ...product.additional_images];
  const reviews = product.latest_comments.map(mapCommentToReview);
  const fitStats = mapFitStats(product.fit_stats);
  const similar = [...trendingProducts, ...womensFashion].slice(0, 10);

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
        similar={similar.slice(0, 4)}
        followLabel={dict.shop.follow}
        followingLabel={dict.shop.following}
      />

      <div className="hidden md:contents">
        <ProductStickyBar product={product} />
        <Header lang={lang} dict={dict} isSticky={false} />

        <main className="flex-1">
          <div className="mx-auto flex max-w-360 flex-col gap-6 px-6 py-6">
            <ProductBreadcrumb items={breadcrumbItems} />

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-8">
                <ProductPreviewGallery images={gallery} alt={product.title} />

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

            <SimilarProducts products={similar} countLabel="3300+ products" />
          </div>
        </main>

        <Footer dict={dict} />
      </div>
    </>
  );
}
