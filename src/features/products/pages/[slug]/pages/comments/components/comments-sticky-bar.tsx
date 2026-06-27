"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "@solar-icons/react";
import { Button } from "@/shared/components/ui/button";
import type { IProductDetailUI } from "@/features/products/pages/[slug]/pages/comments/utils/product-detail.interface";
import type { locales } from "@/core/config/i18n/i18n-config";
import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  product: IProductDetailUI;
  lang: (typeof locales)[number];
}

export function CommentsStickyBar({ product, lang }: IProps) {
  const { currency } = useCurrency();
  const dict = useDictionary();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex max-w-360 items-center gap-4 px-6 py-3">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative aspect-3/4 w-14 shrink-0 overflow-hidden rounded-sm bg-muted">
            <Image
              src={product.gallery[0]}
              alt={product.title}
              fill
              quality={90}
              sizes="56px"
              className="object-cover"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold leading-none">
              {formatPrice(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through">
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
            {product.originalPrice && (
              <span className="rounded-[8px] bg-emerald-100 px-2 py-1.5 text-xs font-semibold text-emerald-700">
                {formatPrice(product.originalPrice - product.price, currency)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="min-w-[220px] rounded-lg px-10 py-3 text-sm font-semibold"
            size="lg"
          >
            <Link href={`/${lang}/products/${product.slug}`}>
              {dict.comments.backToProduct}
            </Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-11 rounded-full"
            aria-label={dict.comments.addToWishlist}
          >
            <Heart className="size-5" weight="Outline" />
          </Button>
        </div>
      </div>
    </div>
  );
}
