"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Heart, ShoppingCart, Star, Truck } from "lucide-react";
import type { IProduct } from "@/lib/interfaces/product.interface";
import { cn } from "@/lib/utils";
import { ProductPreviewDialog } from "./product-preview/product-preview-dialog";

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
        "group flex flex-col overflow-hidden rounded-lg border transition-shadow",
        isDark
          ? "border-white/10 bg-white text-foreground"
          : "border-border bg-card text-card-foreground",
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-muted">
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
          className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-white/90"
        >
          <Heart className="size-4" />
        </button>
        {product.discountLabel && (
          <span className="absolute right-3 top-3 rounded-md bg-rose-500 px-2 py-1 text-xs font-bold text-white">
            {product.discountLabel}
          </span>
        )}
        {product.badge && (
          <span className="absolute bottom-3 left-3 rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-semibold italic text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-base font-bold leading-tight">{product.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {product.subtitle}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.saveLabel && (
            <span className="ml-auto text-sm font-semibold text-emerald-600">
              {product.saveLabel}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 rounded-xl ">
          <div className="bg-muted px-3 py-2 flex items-center gap-2 rounded-sm h-9">
            {product.delivery && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Truck className="size-5" />
                {product.delivery}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs font-medium text-foreground">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {product.rating}
              <span className="text-muted-foreground">({product.reviews})</span>
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
            className="ml-auto grid cursor-pointer size-9 place-items-center rounded-sm bg-foreground text-background transition-colors hover:bg-foreground/90"
          >
            <ShoppingCart className="size-4" />
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
