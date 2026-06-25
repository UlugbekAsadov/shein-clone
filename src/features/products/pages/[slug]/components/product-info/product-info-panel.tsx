"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import {
  getVariantColorSwatches,
  getVariantSizeDetail,
  getVariantSizes,
} from "@/features/products/pages/[slug]/utils/variant.mapper";
import { getOriginalPrice } from "@/shared/utils/product-display";
import { buildSelectedSkuInfo } from "@/features/cart/utils/cart.helpers";
import { ProductColorSelector } from "@/shared/components/product/product-preview/product-color-selector";
import { ProductSizeSelector } from "@/shared/components/product/product-preview/product-size-selector";
import { ProductQtyStepper } from "@/shared/components/product/product-preview/product-qty-stepper";
import { ProductRatingStars } from "@/shared/components/product/product-preview/product-rating-stars";
import { Button } from "@/shared/components/ui/button";
import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useProductVariant } from "@/features/products/pages/[slug]/providers/product-variant.provider";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  product: IProductDetail;
  syncToUrl?: boolean;
}

export function ProductInfoPanel({ product, syncToUrl = true }: IProps) {
  const dict = useDictionary();
  const { currency } = useCurrency();
  const { add } = useCart();
  const { colorId, setColorId } = useProductVariant();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const colors = getVariantColorSwatches(product.variant_clothes);
  const displayColor = colorId || colors[0]?.id || "";
  const sizes = getVariantSizes(product.variant_clothes, displayColor);

  const urlSize = syncToUrl ? searchParams.get("size") ?? "" : "";
  const [sizeId, setSizeIdState] = useState(
    sizes.some((s) => s.id === urlSize) ? urlSize : "",
  );
  const [qty, setQty] = useState(1);
  const [showErrors, setShowErrors] = useState(false);

  const sizeDetail = getVariantSizeDetail(product.variant_clothes, colorId, sizeId);
  const price = sizeDetail?.price ?? product.price;
  const discount = sizeDetail?.discount ?? product.discount;
  const discountType = sizeDetail?.discount_type ?? product.discount_type;
  const originalPrice = getOriginalPrice(price, discount, discountType);

  function handleColorChange(nextColor: string) {
    const nextSizes = getVariantSizes(product.variant_clothes, nextColor);
    const nextSize = nextSizes.some((s) => s.id === sizeId) ? sizeId : "";
    setColorId(nextColor);
    setSizeIdState(nextSize);
    if (!syncToUrl) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("color", nextColor);
    if (nextSize) {
      params.set("size", nextSize);
    } else {
      params.delete("size");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSubmit() {
    if (!colorId || !sizeId || !sizeDetail) {
      setShowErrors(true);
      return;
    }
    void add(
      product,
      sizeDetail.sku_id,
      qty,
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
      if (!syncToUrl) return;
      const params = new URLSearchParams(searchParams.toString());
      params.set("size", size);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams, syncToUrl],
  );

  return (
    <div className="flex flex-col gap-5 scrollbar-hidden">
      <div>
        <h1 className="text-2xl font-bold leading-tight">{product.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <ProductRatingStars />
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            {product.reviews_count} {dict.product.reviews}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            {product.sold_count} {dict.product.sold}
          </span>
        </div>
      </div>
      <div className="text-sm text-secondary-foreground" dangerouslySetInnerHTML={{ __html: product.description }} />
      <div className="flex items-center gap-3">
        <span className="text-4xl font-bold">
          {formatPrice(price, currency)}
        </span>
        {originalPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(originalPrice, currency)}
          </span>
        )}
        {originalPrice && (
          <span className="rounded-sm bg-emerald-100 px-2.5 py-1.5 text-sm font-semibold text-emerald-700">
            {formatPrice(originalPrice - price, currency)}
          </span>
        )}
      </div>

      {colors.length > 0 && (
        <ProductColorSelector
          swatches={colors}
          value={colorId}
          error={showErrors && !colorId}
          onChange={handleColorChange}
        />
      )}

      {sizes.length > 0 && (
        <ProductSizeSelector
          sizes={sizes}
          value={sizeId}
          recommended={product.size_recommendation}
          error={showErrors && !sizeId}
          onChange={handleSizeChange}
        />
      )}

      <ProductQtyStepper value={qty} onChange={setQty} />

      <div className="mt-2 flex gap-3">
        <Button
          type="button"
          onClick={handleSubmit}
          className="flex-1 cursor-pointer py-4 text-base font-semibold transition hover:bg-foreground/90"
          variant="default"
          size="lg"
        >
          {dict.common.addToCart}
        </Button>

        <Button
          type="button"
          onClick={handleSubmit}
          className="flex-1 cursor-pointer py-4 text-base font-semibold transition"
          variant="outline"
          size="lg"
        >
          {dict.common.buyNow}
        </Button>
      </div>
    </div>
  );
}
