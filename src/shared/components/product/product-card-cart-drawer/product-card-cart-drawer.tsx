"use client";

import { useState } from "react";
import { AltArrowLeft, CartLarge2 } from "@solar-icons/react";
import { XIcon } from "@/shared/components/icons/outline";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import type { IProduct } from "@/types/product.interface";
import { formatPrice } from "@/shared/utils/format-price";
import { getOriginalPrice } from "@/shared/utils/product-display";
import { useCurrency } from "@/shared/hooks/use-currency";
import { useProductDetail } from "@/features/products/hooks/use-product-detail";
import {
  getVariantColorSwatches,
  getVariantSizeDetail,
  getVariantSizes,
} from "@/features/products/pages/[slug]/utils/variant.mapper";
import { SelectSizeView } from "./select-size-view";
import { SizeGuideView } from "./size-guide-view";
import { ProductCartDrawerSkeleton } from "./product-cart-drawer-skeleton";

interface IProps {
  product: IProduct;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type View = "select" | "guide";

const VIEW_TRANSITION_MS = 300;

export function ProductCardCartDrawer({ product, open, onOpenChange }: IProps) {
  const { currency } = useCurrency();
  const slug = product.slug ?? String(product.id);
  const { data, loading, error } = useProductDetail(slug, open);

  const [view, setView] = useState<View>("select");
  const [colorId, setColorId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const colors = data ? getVariantColorSwatches(data.variant_clothes) : [];
  const displayColor = colorId || colors[0]?.id || "";
  const sizes = data ? getVariantSizes(data.variant_clothes, displayColor) : [];

  const sizeDetail = data
    ? getVariantSizeDetail(data.variant_clothes, colorId, sizeId)
    : undefined;
  const price = sizeDetail?.price ?? data?.price ?? product.price;
  const discount = sizeDetail?.discount ?? data?.discount ?? 0;
  const discountType = sizeDetail?.discount_type ?? data?.discount_type ?? "";
  const originalPrice = getOriginalPrice(price, discount, discountType);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setView("select");
        setShowErrors(false);
      }, VIEW_TRANSITION_MS);
    }
  };

  function handleColorChange(nextColor: string) {
    if (!data) return;
    const nextSizes = getVariantSizes(data.variant_clothes, nextColor);
    setColorId(nextColor);
    setSizeId(nextSizes.some((s) => s.id === sizeId) ? sizeId : "");
  }

  function handleAddToCart() {
    if (!colorId || !sizeId) {
      setShowErrors(true);
      return;
    }
    onOpenChange(false);
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="pb-6 z-100">
        <div className="flex items-center justify-between gap-2 px-5 pt-2">
          <div className="flex items-center gap-2">
            {view === "guide" && (
              <button
                type="button"
                aria-label="Back"
                onClick={() => setView("select")}
                className="grid size-7 cursor-pointer place-items-center duration-200 animate-in fade-in slide-in-from-left-2"
              >
                <AltArrowLeft className="size-6" weight="Outline" />
              </button>
            )}
            <DrawerTitle className="text-lg font-bold">
              {view === "guide" ? "Size guide" : "Select a size"}
            </DrawerTitle>
          </div>
          <DrawerClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="grid size-7 cursor-pointer place-items-center rounded-full bg-secondary text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          </DrawerClose>
        </div>

        {!data && loading ? (
          <ProductCartDrawerSkeleton />
        ) : error && !data ? (
          <div className="grid place-items-center px-5 py-12 text-center">
            <p className="text-sm text-secondary-foreground">
              Couldn&apos;t load this product. Please try again.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden">
              <div
                className={cn(
                  "flex w-[200%] ease-out",
                  "transition-transform duration-300",
                  view === "select" ? "translate-x-0" : "-translate-x-1/2",
                )}
              >
                <div className="w-1/2 shrink-0 px-5">
                  <SelectSizeView
                    colors={colors}
                    colorValue={colorId}
                    colorError={showErrors && !colorId}
                    onColorChange={handleColorChange}
                    sizes={sizes}
                    sizeValue={sizeId}
                    sizeError={showErrors && !sizeId}
                    recommended={data?.size_recommendation ?? ""}
                    onSizeChange={setSizeId}
                    onShowGuide={() => setView("guide")}
                  />
                </div>
                <div className="w-1/2 shrink-0 px-5">
                  <SizeGuideView />
                </div>
              </div>
            </div>

            <div className="mt-6 px-5">
              <div className="mb-3 flex items-center gap-1.5">
                <span className="text-xl font-bold text-foreground">
                  {formatPrice(price, currency)}
                </span>
                {originalPrice && (
                  <span className="text-xs font-bold text-muted-foreground line-through">
                    {formatPrice(originalPrice, currency)}
                  </span>
                )}
                {originalPrice && (
                  <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {formatPrice(originalPrice - price, currency)}
                  </span>
                )}
              </div>

              <Button
                className="h-12 w-full rounded-sm text-base font-semibold"
                onClick={handleAddToCart}
              >
                <span>Add to cart</span>
                <CartLarge2 className="ml-1 size-6" />
              </Button>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
