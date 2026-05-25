"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import type { IProduct } from "@/types/product.interface";
import { cn } from "@/lib/utils";
import { ProductPreviewDialog } from "./product-preview/product-preview-dialog/product-preview-dialog";
import { Tag } from "@/shared/components/tag/tag";
import { CartLarge2, Heart, Star } from "@solar-icons/react";
import { TruckIconSolid } from "../icons/solid";

interface IProps {
  product: IProduct;
}

export function ProductListItem({ product }: IProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { lang } = useParams<{ lang: string }>();
  const href = `/${lang}/product/${product.slug ?? product.id}`;

  return (
    <article className="relative">
      <Link
        target="_blank"
        href={href}
        className="group flex gap-4 rounded-[19px] bg-secondary p-3 transition-colors"
      >
        <div className="relative aspect-3/4 w-[165px] shrink-0 overflow-hidden rounded-[10px] bg-muted">
          <Image
            src={product.image}
            alt={product.title}
            fill
            quality={95}
            sizes="200px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discountLabel && (
            <span className="absolute right-2 top-2 z-10 rounded-[8px] bg-rose-500 px-2 py-1 text-xs font-bold text-white">
              {product.discountLabel}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 py-2 pr-4">
          <h3 className="text-lg font-bold leading-tight">{product.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.subtitle}
          </p>

          <div className="mt-1 flex items-center gap-3 text-xs">
            {product.delivery && (
              <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
                <TruckIconSolid className="size-5" fill="#898991" />
                {product.delivery}
              </span>
            )}
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Star className="size-4 fill-primary text-primary" />
              {product.rating}
              <span className="font-normal text-muted-foreground">
                ({product.reviews})
              </span>
            </span>
            {product.badge && <Tag label={product.badge} variant="success" />}
          </div>

          <div className="flex flex-col flex-1 justify-end">
            {product.originalPrice && (
              <span className="text-sm font-medium text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold">
                ${product.price.toFixed(2)}
              </span>
              {product.saveLabel && (
                <span className="text-sm font-bold text-[#21BE65]">
                  {product.saveLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label="Add to wishlist"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={cn(
          "absolute right-3 top-3 z-20 grid size-7.5 place-items-center rounded-full bg-white text-foreground shadow-sm transition-colors",
          "hover:bg-white/90",
        )}
      >
        <Heart className="size-5 text-secondary-foreground" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setPreviewOpen(true);
        }}
        aria-label="Add to cart"
        className="absolute bottom-3 right-3 z-20 grid size-10 cursor-pointer place-items-center rounded-[10px] bg-foreground text-background transition-colors hover:bg-foreground/90"
      >
        <CartLarge2 className="size-6" />
      </button>

      <ProductPreviewDialog
        product={product}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      />
    </article>
  );
}
