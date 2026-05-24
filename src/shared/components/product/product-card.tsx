"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { IProduct } from "@/types/product.interface";
import { cn } from "@/lib/utils";
import { ProductPreviewDialog } from "./product-preview/product-preview-dialog/product-preview-dialog";
import { ProductCardCartDrawer } from "./product-card-cart-drawer/product-card-cart-drawer";
import { Tag } from "@/shared/components/tag/tag";
import { Bag, CartLarge2, Heart, Star } from "@solar-icons/react";
import { TruckIconSolid } from "../icons/solid";
import { Button } from "../ui/button";

interface IProps {
  product: IProduct;
  variant?: "default" | "dark";
}

export function ProductCard({ product, variant = "default" }: IProps) {
  const isDark = variant === "dark";
  const [previewOpen, setPreviewOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const href = `/${lang}/product/${product.slug ?? product.id}`;

  return (
    <article>
      <Link
        target="_blank"
        href={href}
        className={cn(
          "group flex flex-col overflow-hidden rounded-[10px] ",
          "md:p-1.5 md:rounded-lg",
          isDark
            ? "border-white/10 md:bg-secondary text-foreground"
            : "border-border md:bg-card text-card-foreground",
        )}
      >
        <div
          className={cn(
            "relative aspect-4/5 overflow-hidden bg-muted rounded-[10px]",
            "md:rounded-md",
          )}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            quality={95}
            sizes="(max-width: 1440px) 25vw, 360px"
            className={cn(
              "object-cover transition-transform duration-300",
              "group-hover:scale-105",
            )}
          />
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={cn(
              "absolute left-2 top-2 grid size-6 place-items-center rounded-full bg-white text-foreground shadow-sm transition-colors",
              "md:left-3 md:top-3 md:size-7.5",
              "hover:bg-white/90",
            )}
          >
            <Heart
              className={cn("size-4.5 text-secondary-foreground", "md:size-5")}
            />
          </button>
          {product.discountLabel && (
            <span
              className={cn(
                "absolute right-2 top-2 rounded-full bg-rose-500 px-1 py-0.5 text-[11px] font-bold text-white",
                "md:right-3 md:top-3 md:rounded-[8px] md:px-2 md:py-1.5 md:text-xs",
              )}
            >
              {product.discountLabel}
            </span>
          )}
          {product.badge && (
            <Tag
              label={product.badge}
              variant="success"
              className="absolute bottom-3 left-3"
            />
          )}
        </div>

        <div
          className={cn(
            "flex flex-col gap-1 p-0 pt-1 pb-0.5",
            "md:p-2.5 md:pb-3.5",
          )}
        >
          <h3 className={cn("text-sm font-bold leading-tight", "md:text-lg")}>
            {product.title}
          </h3>
          <p className={cn("line-clamp-1 text-sm text-muted-foreground")}>
            {product.subtitle}
          </p>
          <div className="flex items-center gap-2">
            <span className={cn("text-base font-extrabold", "md:text-lg")}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span
                className={cn(
                  "text-[11px] text-muted-foreground line-through font-medium",
                  "md:text-xs",
                )}
              >
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.saveLabel && (
              <span
                className={cn(
                  "ml-auto hidden text-xs font-bold text-[#21BE65]",
                  "md:block",
                )}
              >
                {product.saveLabel}
              </span>
            )}
          </div>
          <div
            className={cn(
              "mt-4 items-center justify-between gap-2 rounded-xl hidden",
              "md:flex",
            )}
          >
            <div className="bg-secondary px-2.5 py-2 flex items-center gap-1.5 rounded-[10px] h-9">
              {product.delivery && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <TruckIconSolid className="size-5" fill="#898991" />
                  {product.delivery}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs font-semibold text-foreground ">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {product.rating}
                <span className="text-muted-foreground font-normal">
                  ({product.reviews})
                </span>
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPreviewOpen(true);
              }}
              aria-label="Add to cart"
              className=" grid cursor-pointer size-9 place-items-center rounded-[10px] bg-foreground text-background transition-colors hover:bg-foreground/90"
            >
              <CartLarge2 className="size-6" />
            </button>
          </div>
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCartDrawerOpen(true);
            }}
            className={cn("flex items-center gap-2 rounded-[8px]", "md:hidden")}
          >
            <span>12-May</span>
            <Bag />
          </Button>
        </div>
      </Link>

      <ProductPreviewDialog
        product={product}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />

      <ProductCardCartDrawer
        open={cartDrawerOpen}
        onOpenChange={setCartDrawerOpen}
      />
    </article>
  );
}
