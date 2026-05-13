"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { IProduct } from "@/types/product.interface";
import { cn } from "@/lib/utils";
import { ProductPreviewDialog } from "./product-preview/product-preview-dialog";
import { Tag } from "@/shared/components/tag/tag";
import { CartLarge2, Heart, Star } from "@solar-icons/react";
import { TruckIconSolid } from "../icons/solid";

interface IProps {
  product: IProduct;
  variant?: "default" | "dark";
}

export function ProductCard({ product, variant = "default" }: IProps) {
  const isDark = variant === "dark";
  const [previewOpen, setPreviewOpen] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const href = `/${lang}/product/${product.slug ?? product.id}`;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border transition-shadow p-1.5",
        isDark
          ? "border-white/10 bg-secondary text-foreground"
          : "border-border bg-card text-card-foreground",
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-muted rounded-md">
        <Image
          src={product.image}
          alt={product.title}
          fill
          quality={95}
          sizes="(max-width: 1440px) 25vw, 360px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute left-3 top-3 grid size-7.5 place-items-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-white/90"
        >
          <Heart className="size-5 text-secondary-foreground" />
        </button>
        {product.discountLabel && (
          <span className="absolute right-3 top-3 rounded-[8px] bg-rose-500 px-2 py-1.5 text-xs font-bold text-white">
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

      <div className="flex flex-col gap-1 p-2.5 pb-3.5">
        <h3 className="text-lg font-bold leading-tight">{product.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {product.subtitle}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.saveLabel && (
            <span className="ml-auto text-xs font-bold text-[#21BE65]">
              {product.saveLabel}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl">
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
      </div>

      <ProductPreviewDialog
        product={product}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </Link>
  );
}
