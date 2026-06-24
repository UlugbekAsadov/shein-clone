"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Heart } from "@solar-icons/react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import { getOriginalPrice } from "@/shared/utils/product-display";
import { getVariantSizeDetail } from "@/features/products/pages/[slug]/utils/variant.mapper";
import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";
import { useCart } from "@/features/cart/hooks/use-cart";
import { buildSelectedSkuInfo } from "@/features/cart/utils/cart.helpers";

interface IProps {
  product: IProductDetail;
}

export function ProductStickyBar({ product }: IProps) {
  const { currency } = useCurrency();
  const { add } = useCart();
  const searchParams = useSearchParams();
  const originalPrice = getOriginalPrice(
    product.price,
    product.discount,
    product.discount_type,
  );
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAddToCart() {
    const color = searchParams.get("color") ?? "";
    const size = searchParams.get("size") ?? "";
    const sizeDetail = getVariantSizeDetail(
      product.variant_clothes,
      color,
      size,
    );
    if (!sizeDetail) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    void add(
      product,
      sizeDetail.sku_id,
      1,
      buildSelectedSkuInfo(size, color),
    ).then((result) => {
      if (!result.ok) toast.error(result.message ?? "Couldn't add to cart");
    });
    toast.success("Added to cart");
  }

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-300 ease-out shadow-lg bg-background",
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
      )}
    >
      <div className="mx-auto max-w-360 px-6">
        <div
          className={cn(
            "flex items-center  gap-4 bg-background px-4 py-3 ",
            visible && "pointer-events-auto",
          )}
        >
          <div className="flex items-center flex-1 gap-2">
            <div className="relative w-14 aspect-3/4 shrink-0 overflow-hidden rounded-sm bg-muted">
              <Image
                src={product.image_url}
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
              {originalPrice && (
                <span className="text-muted-foreground line-through">
                  {formatPrice(originalPrice, currency)}
                </span>
              )}
              {originalPrice && (
                <span className="rounded-[8px] bg-emerald-100 px-2 py-1.5 text-xs font-semibold text-emerald-700">
                  {formatPrice(originalPrice - product.price, currency)}
                </span>
              )}
            </div>
          </div>

          <div className=" flex items-center gap-3">
            <Button
              type="button"
              onClick={handleAddToCart}
              className="min-w-[220px] rounded-lg px-10 py-3 text-sm font-semibold"
              size="lg"
            >
              Add to cart
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="size-11 rounded-full"
              aria-label="Add to wishlist"
            >
              <Heart className="size-5" weight="Outline" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
