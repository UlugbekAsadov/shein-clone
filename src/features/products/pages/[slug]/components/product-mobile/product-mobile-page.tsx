"use client";

import { useParams } from "next/navigation";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";
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
  getVariantSizeDetail,
  getVariantSizes,
} from "@/features/products/pages/[slug]/utils/variant.mapper";
import { getOriginalPrice } from "@/shared/utils/product-display";
import { useCart } from "@/features/cart/hooks/use-cart";
import { buildSelectedSkuInfo } from "@/features/cart/utils/cart.helpers";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
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
  const dict = useDictionary();
  const { lang } = useParams<{ lang: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { add } = useCart();

  const colors = getVariantColorSwatches(product.variant_clothes);
  const validColors = new Set(colors.map((c) => c.id));
  const urlColor = searchParams.get("color") ?? "";
  const [colorId, setColorId] = useState(
    validColors.has(urlColor) ? urlColor : "",
  );

  const displayColor = colorId || colors[0]?.id || "";
  const sizes = getVariantSizes(product.variant_clothes, displayColor);
  const urlSize = searchParams.get("size") ?? "";
  const [sizeId, setSizeIdState] = useState(
    sizes.some((s) => s.id === urlSize) ? urlSize : "",
  );
  const [showErrors, setShowErrors] = useState(false);

  const commentsHref = `/${lang}/products/${product.slug}/comments`;

  function handleColorChange(nextColor: string) {
    const nextSizes = getVariantSizes(product.variant_clothes, nextColor);
    const nextSize = nextSizes.some((s) => s.id === sizeId) ? sizeId : "";
    setColorId(nextColor);
    setSizeIdState(nextSize);
    const params = new URLSearchParams(searchParams.toString());
    params.set("color", nextColor);
    if (nextSize) {
      params.set("size", nextSize);
    } else {
      params.delete("size");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleAddToCart() {
    const sizeDetail = getVariantSizeDetail(
      product.variant_clothes,
      colorId,
      sizeId,
    );
    if (!colorId || !sizeId || !sizeDetail) {
      setShowErrors(true);
      return;
    }
    void add(
      product,
      sizeDetail.sku_id,
      1,
      buildSelectedSkuInfo(sizeId, colorId),
    ).then((result) => {
      if (!result.ok)
        toast.error(result.message ?? dict.common.couldntAddToCart);
    });
    toast.success(dict.common.addedToCart);
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

  const hasVariants = product.variant_clothes.length > 0;
  const mobileGalleryImages = hasVariants
    ? product.variant_clothes.map((variant) => variant.image_url)
    : [product.image_url, ...product.additional_images];
  const activeImageIndex = hasVariants
    ? Math.max(
        0,
        product.variant_clothes.findIndex((variant) => variant.color === colorId),
      )
    : 0;

  return (
    <div className="md:hidden">
      <ProductMobileGallery
        images={mobileGalleryImages}
        alt={product.title}
        activeIndex={activeImageIndex}
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
            error={showErrors && !colorId}
            onChange={handleColorChange}
          />
        )}

        {sizes.length > 0 && (
          <ProductMobileSize
            sizes={sizes}
            value={sizeId}
            recommended={product.size_recommendation}
            error={showErrors && !sizeId}
            onChange={handleSizeChange}
          />
        )}

        <ProductMobileFitBars stats={fitStats} />

        {reviewMedia.length > 0 && (
          <ProductMobileMediaGallery
            title={dict.product.mediaGallery}
            images={reviewMedia}
            viewAllHref={commentsHref}
          />
        )}

        {reviews.length > 0 && (
          <ProductMobileCommentsCarousel
            title={dict.product.comments}
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
          label={dict.common.addToCart}
          onClick={handleAddToCart}
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
