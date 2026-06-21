"use client";

import { useParams } from "next/navigation";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import type {
  IProductDetail,
  IProductHighlight,
} from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";
import type { IProduct } from "@/types/product.interface";
import type {
  IFitStat,
  IReview,
} from "@/features/products/pages/[slug]/utils/review.interface";
import {
  getVariantColorSwatches,
  getVariantImages,
  getVariantSizes,
} from "@/features/products/pages/[slug]/utils/variant.mapper";
import { getOriginalPrice } from "@/features/products/pages/[slug]/utils/price.mapper";
import { ProductMobileGallery } from "./product-mobile-gallery";
import { ProductMobileRatingRow } from "./product-mobile-rating-row";
import { ProductMobileDescription } from "./product-mobile-description";
import { ProductMobileColor } from "./product-mobile-color";
import { ProductMobileSize } from "./product-mobile-size";
import { ProductMobileFitBars } from "./product-mobile-fit-bars";
import { ProductMobileMediaGallery } from "./product-mobile-media-gallery";
import { ProductMobileCommentsCarousel } from "./product-mobile-comments-carousel";
import { ProductMobileShopCard } from "./product-mobile-shop-card";
import { ProductSellerFallback } from "../product-info/product-seller-fallback";
import { ProductMobileInfoRows } from "./product-mobile-info-rows";
import { ProductMobileSimilar } from "./product-mobile-similar";
import { ProductMobileCta } from "./product-mobile-cta";

interface IProps {
  product: IProductDetail;
  shop: IApiShop | null;
  sellerFallbackHighlight?: IProductHighlight;
  fitStats: IFitStat[];
  reviewMedia: string[];
  reviews: IReview[];
  similar: IProduct[];
  followLabel: string;
  followingLabel: string;
}

export function ProductMobilePage({
  product,
  shop,
  sellerFallbackHighlight,
  fitStats,
  reviewMedia,
  reviews,
  similar,
  followLabel,
  followingLabel,
}: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const colors = getVariantColorSwatches(product.variant_clothes);
  const validColors = new Set(colors.map((c) => c.id));
  const urlColor = searchParams.get("color") ?? "";
  const [colorId, setColorId] = useState(
    validColors.has(urlColor) ? urlColor : (colors[0]?.id ?? ""),
  );

  const sizes = getVariantSizes(product.variant_clothes, colorId);
  const urlSize = searchParams.get("size") ?? "";
  const [sizeId, setSizeIdState] = useState(
    sizes.some((s) => s.id === urlSize)
      ? urlSize
      : (sizes.find((s) => s.id === product.size_recommendation)?.id ?? sizes[0]?.id ?? ""),
  );

  const commentsHref = `/${lang}/products/${product.slug}/comments`;

  function handleColorChange(nextColor: string) {
    const nextSizes = getVariantSizes(product.variant_clothes, nextColor);
    const nextSize =
      nextSizes.find((s) => s.id === product.size_recommendation)?.id ??
      nextSizes[0]?.id ??
      "";
    setColorId(nextColor);
    setSizeIdState(nextSize);
    const params = new URLSearchParams(searchParams.toString());
    params.set("color", nextColor);
    params.set("size", nextSize);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleSizeChange = useCallback(
    (size: string) => {
      setSizeIdState(size);
      const params = new URLSearchParams(searchParams.toString());
      params.set("size", size);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const mobileGalleryImages = getVariantImages(
    product.variant_clothes,
    colorId,
    [product.image_url, ...product.additional_images],
  );

  return (
    <div className="md:hidden">
      <ProductMobileGallery
        images={mobileGalleryImages}
        alt={product.title}
      />

      <div className="relative -mt-4 flex flex-col rounded-t-[20px] bg-background px-3 pt-3 pb-3">
        <div className="mx-auto mb-3 h-1 w-10 shrink-0 rounded-full bg-muted" />

        <h1 className="text-lg font-semibold leading-tight text-foreground">
          {product.title}
        </h1>

        <ProductMobileRatingRow
          rating={product.rating}
          reviews={product.reviews_count}
          sold={product.sold_count}
        />

        <ProductMobileDescription description={product.description} />

        {colors.length > 0 && (
          <ProductMobileColor
            swatches={colors}
            value={colorId}
            onChange={handleColorChange}
          />
        )}

        {sizes.length > 0 && (
          <ProductMobileSize
            sizes={sizes}
            value={sizeId}
            recommended={product.size_recommendation}
            onChange={handleSizeChange}
          />
        )}

        <ProductMobileFitBars stats={fitStats} />

        {reviewMedia.length > 0 && (
          <ProductMobileMediaGallery
            title="Image and video"
            images={reviewMedia}
            viewAllHref={commentsHref}
          />
        )}

        {reviews.length > 0 && (
          <ProductMobileCommentsCarousel
            title="Comments"
            reviews={reviews}
            viewAllHref={commentsHref}
          />
        )}

        {shop ? (
          <ProductMobileShopCard
            shop={shop}
            followLabel={followLabel}
            followingLabel={followingLabel}
          />
        ) : (
          sellerFallbackHighlight && (
            <div className="mt-5">
              <ProductSellerFallback highlight={sellerFallbackHighlight} />
            </div>
          )
        )}

        <ProductMobileInfoRows highlights={product.highlights} />

        <ProductMobileSimilar products={similar} />

        <ProductMobileCta
          label="Add to cart"
          price={product.price}
          originalPrice={getOriginalPrice(
            product.price,
            product.discount,
            product.discount_type,
          )}
        />
      </div>
    </div>
  );
}
