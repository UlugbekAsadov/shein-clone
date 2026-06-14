"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { IProduct } from "@/types/product.interface";
import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";
import { cn } from "@/lib/utils";
import { Heart } from "@solar-icons/react";

interface IProps {
  product: IProduct;
  variant?: "default" | "dark";
}

export function ProductSliderCard({ product, variant = "default" }: IProps) {
  const isDark = variant === "dark";
  const { currency } = useCurrency();
  const { lang } = useParams<{ lang: string }>();
  const href = `/${lang}/product/${product.slug ?? product.id}`;

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[12px] border p-0.5",
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
          sizes="(max-width: 768px) 75vw, 360px"
          className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-[8px]"
        />
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-white text-foreground shadow-sm transition-colors hover:bg-white/90"
        >
          <Heart className="size-5 text-secondary-foreground" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 px-3 py-4 text-center">
        <h3 className="text-base font-semibold leading-tight">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">
            {formatPrice(product.price, currency)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice, currency)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
