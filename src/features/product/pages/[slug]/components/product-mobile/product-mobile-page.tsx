"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import type { IProductDetail } from "@/features/product/pages/[slug]/utils/product-detail.interface";
import type { IProduct } from "@/types/product.interface";
import type {
  IFitStat,
  IReview,
} from "@/features/product/pages/[slug]/utils/review.interface";
import type { ISellerCard } from "@/features/product/pages/[slug]/utils/seller-card.interface";
import { ProductMobileGallery } from "./product-mobile-gallery";
import { ProductMobileRatingRow } from "./product-mobile-rating-row";
import { ProductMobileDescription } from "./product-mobile-description";
import { ProductMobileColor } from "./product-mobile-color";
import { ProductMobileSize } from "./product-mobile-size";
import { ProductMobileFitBars } from "./product-mobile-fit-bars";
import { ProductMobileMediaGallery } from "./product-mobile-media-gallery";
import { ProductMobileCommentsCarousel } from "./product-mobile-comments-carousel";
import { ProductMobileShopCard } from "./product-mobile-shop-card";
import { ProductMobileInfoRows } from "./product-mobile-info-rows";
import { ProductMobileSimilar } from "./product-mobile-similar";
import { ProductMobileCta } from "./product-mobile-cta";

interface IProps {
  product: IProductDetail;
  fitStats: IFitStat[];
  reviewMedia: string[];
  reviews: IReview[];
  similar: IProduct[];
  seller: ISellerCard;
  followLabel: string;
  followingLabel: string;
}

export function ProductMobilePage({
  product,
  fitStats,
  reviewMedia,
  reviews,
  similar,
  seller,
  followLabel,
  followingLabel,
}: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const [colorId, setColorId] = useState(product.colors[0].id);
  const [sizeId, setSizeId] = useState(product.recommendedSize);

  const commentsHref = `/${lang}/product/${product.slug}/comments`;

  return (
    <div className="md:hidden">
      <ProductMobileGallery images={product.gallery} alt={product.title} />

      <div className="relative -mt-4 flex flex-col rounded-t-[20px] bg-background px-3 pt-3 pb-3">
        <div className="mx-auto mb-3 h-1 w-10 shrink-0 rounded-full bg-muted" />

        <h1 className="text-lg font-semibold leading-tight text-foreground">
          {product.title}
        </h1>

        <ProductMobileRatingRow
          rating={product.rating}
          reviews={product.reviews}
          sold={product.sold}
        />

        <ProductMobileDescription description={product.subtitle} />

        <ProductMobileColor
          swatches={product.colors}
          value={colorId}
          onChange={setColorId}
        />

        <ProductMobileSize
          sizes={product.sizes}
          value={sizeId}
          recommended={product.recommendedSize}
          onChange={setSizeId}
        />

        <ProductMobileFitBars stats={fitStats} />

        <ProductMobileMediaGallery
          title="Image and video"
          images={reviewMedia}
          viewAllHref={commentsHref}
        />

        <ProductMobileCommentsCarousel
          title="Comments"
          reviews={reviews}
          viewAllHref={commentsHref}
        />

        <ProductMobileShopCard
          seller={seller}
          followLabel={followLabel}
          followingLabel={followingLabel}
        />

        <ProductMobileInfoRows />

        <ProductMobileSimilar products={similar} />

        <ProductMobileCta
          label="Add to cart"
          price={product.price}
          originalPrice={product.originalPrice}
          saveLabel={product.saveLabel}
        />
      </div>
    </div>
  );
}
