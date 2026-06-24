"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { IProduct } from "@/types/product.interface";
import { formatPrice } from "@/shared/utils/format-price";
import {
  getProductImages,
  getProductOriginalPrice,
  getProductDiscountLabel,
  getProductBadge,
  getProductReviews,
} from "@/shared/utils/product-display";
import { useCurrency } from "@/shared/hooks/use-currency";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import { useAdultConsent } from "@/shared/hooks/use-adult-consent";
import { useAdultDialog } from "@/shared/hooks/use-adult-dialog";
import { cn } from "@/lib/utils";
import { ProductAdultOverlay } from "./product-adult-overlay/product-adult-overlay";
import { ProductPreviewDialog } from "./product-preview/product-preview-dialog/product-preview-dialog";
import { ProductCardCartDrawer } from "./product-card-cart-drawer/product-card-cart-drawer";
import { Tag } from "@/shared/components/tag/tag";
import { Bag, Cart5, Heart, Star } from "@solar-icons/react";
import { Button } from "../ui/button";

interface IProps {
  product: IProduct;
  variant?: "default" | "dark" | "secondary";
}

export function ProductCard({ product, variant = "default" }: IProps) {
  const isDark = variant === "dark";
  const isSecondary = variant === "secondary";
  const [previewOpen, setPreviewOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const isMobile = useIsMobile();
  const { confirmed } = useAdultConsent();
  const { open: openAdultDialog } = useAdultDialog();
  const isBlurred = Boolean(product.is_adult) && !confirmed;
  const { currency } = useCurrency();
  const { lang } = useParams<{ lang: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const callbackUrl = query ? `${pathname}?${query}` : pathname;
  const href = `/${lang}/products/${product.slug ?? product.id}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  const images = getProductImages(product);
  const originalPrice = getProductOriginalPrice(product);
  const discountLabel = getProductDiscountLabel(product);
  const badge = getProductBadge(product);
  const reviews = getProductReviews(product);

  return (
    <article>
      <Link
        target="_blank"
        href={href}
        onClick={(e) => {
          if (isBlurred) {
            e.preventDefault();
            openAdultDialog();
          }
        }}
        className={cn(
          "group flex flex-col overflow-hidden rounded-[10px]",
          "md:rounded-lg",
          isDark
            ? "border-white/10 md:bg-white text-foreground"
            : isSecondary
              ? "border-border text-card-foreground bg-card md:bg-white"
              : "border-border text-card-foreground bg-card",
        )}
      >
        <div
          className={cn(
            "relative aspect-4/5 overflow-hidden bg-muted rounded-[10px]",
            "md:rounded-md",
          )}
        >
          <Image
            src="/images/image-placeholder.webp"
            alt=""
            fill
            sizes="(max-width: 1440px) 25vw, 360px"
            className="object-cover"
          />
          {images.map((src, idx) => (
            <Image
              key={`${src}-${idx}`}
              src={src}
              alt={product.title}
              fill
              quality={95}
              sizes="(max-width: 1440px) 25vw, 360px"
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [idx]: true }))
              }
              className={cn(
                "object-cover transition-opacity duration-300",
                "group-hover:scale-105",
                idx === activeIndex && loadedImages[idx]
                  ? "opacity-100"
                  : "opacity-0",
                isBlurred && "scale-110 blur-2xl group-hover:scale-110",
              )}
            />
          ))}
          {isBlurred && <ProductAdultOverlay />}
          {images.length > 1 && (
            <div
              className="absolute inset-0 z-10 grid"
              style={{
                gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
              }}
              onMouseLeave={() => setActiveIndex(0)}
            >
              {images.map((_, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="h-full w-full"
                />
              ))}
            </div>
          )}
          {images.length > 1 && (
            <div className="pointer-events-none absolute inset-x-2 bottom-1 z-20 flex items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:inset-x-3 md:bottom-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors duration-200",
                    idx === activeIndex ? "bg-foreground" : "bg-white/70",
                  )}
                />
              ))}
            </div>
          )}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={cn(
              "absolute right-2 top-2 z-20 grid size-6 place-items-center rounded-full bg-white text-foreground shadow-sm transition-colors",
              "md:right-3 md:top-3 md:size-7.5",
              "hover:bg-white/90",
            )}
          >
            <Heart
              className={cn("size-4.5 text-secondary-foreground", "md:size-5")}
            />
          </button>
          {discountLabel && (
            <span
              className={cn(
                "absolute left-2 top-2 z-20 rounded-full bg-rose-500 px-1 py-0.5 text-[11px] font-bold text-white",
                "md:left-3 md:top-3 md:rounded-[8px] md:px-1.5 md:py-1 md:text-xs",
              )}
            >
              {discountLabel}
            </span>
          )}
          {badge && (
            <Tag
              label={badge}
              variant="success"
              className="absolute bottom-3 left-3 z-20"
              size='sm'
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-col gap-1 p-0 pt-1 pb-0.5",
            "md:p-2 md:pb-2",
          )}
        >
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold">
              {formatPrice(product.price, currency)}
            </span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through font-medium">
                {formatPrice(originalPrice, currency)}
              </span>
            )}
          </div>
          <h3 className="line-clamp-1 text-xs font-medium leading-tight">
            {product.title}
          </h3>

          <span className="flex items-center gap-1 text-xs font-semibold text-foreground my-2">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {product.rating}
            <span className="text-muted-foreground font-normal">
              ({reviews})
            </span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isMobile) setCartDrawerOpen(true);
              else setPreviewOpen(true);
            }}
            aria-label="Add to cart"
            className=" flex items-center gap-2 justify-center cursor-pointer h-6.5 md:h-10 w-full place-items-center rounded-[10px] bg-[#DEDEE4] text-[#383838] transition-colors hover:bg-#DEDEE490 text-sm md:text-base"
          >
            <Cart5 className="size-4.5 md:size-6" /> {product.delivery_date_text}
          </button>
        </div>
      </Link>

      <ProductPreviewDialog
        product={product}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />

      <ProductCardCartDrawer
        product={product}
        open={cartDrawerOpen}
        onOpenChange={setCartDrawerOpen}
      />
    </article>
  );
}
