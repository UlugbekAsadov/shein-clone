"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { IProduct } from "@/types/product.interface";
import {
  colorSwatches,
  galleryPool,
  sizes,
} from "@/shared/mocks/product-preview.mocks";
import {
  DESCRIPTION,
  RECOMMENDED_SIZE,
  TRANSITION_MS,
} from "@/shared/constants/product-preview.constants";
import { cn } from "@/lib/utils";
import { ProductColorSelector } from "./product-color-selector";
import { ProductPreviewGallery } from "./product-preview-gallery";
import { ProductQtyStepper } from "./product-qty-stepper";
import { ProductRatingStars } from "./product-rating-stars";
import { ProductSizeSelector } from "./product-size-selector";

interface IProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
}

export function ProductPreviewDialog({ product, open, onClose }: IProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [colorId, setColorId] = useState(colorSwatches[0].id);
  const [sizeId, setSizeId] = useState("XS");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const t = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, TRANSITION_MS);

    return () => clearTimeout(t);
  }, [open, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mounted, onClose]);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  const soldCount = product.reviews * 5 + 123;

  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
        closing ? "dialog-overlay-exit" : "dialog-overlay-enter",
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative max-h-[90vh] w-full max-w-[1200px] overflow-hidden rounded-3xl bg-background shadow-2xl",
          closing ? "dialog-content-exit" : "dialog-content-enter",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-20 grid size-9 cursor-pointer place-items-center rounded-full text-foreground hover:bg-muted"
        >
          <X className="size-5" />
        </button>

        <div className="grid max-h-[90vh] grid-cols-1 gap-8 overflow-y-auto p-6 md:grid-cols-[1fr_1fr] md:p-8">
          <ProductPreviewGallery images={galleryPool} alt={product.title} />

          <div className="flex flex-col gap-5 pr-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight">
                {product.title}
              </h2>
              <div className="mt-3 flex items-center gap-3 text-sm">
                <ProductRatingStars />
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">
                  {product.reviews} reviews
                </span>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">{soldCount} sold</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {DESCRIPTION}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                {product.price.toFixed(1)}$
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toFixed(1)}$
                </span>
              )}
              {product.saveLabel && (
                <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-sm font-semibold text-emerald-700">
                  {product.saveLabel}
                </span>
              )}
            </div>

            <ProductColorSelector
              swatches={colorSwatches}
              value={colorId}
              onChange={setColorId}
            />

            <ProductSizeSelector
              sizes={sizes}
              value={sizeId}
              recommended={RECOMMENDED_SIZE}
              onChange={setSizeId}
            />

            <ProductQtyStepper value={qty} onChange={setQty} />

            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-full bg-foreground py-4 text-base font-semibold text-background transition hover:bg-foreground/90"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer rounded-full border border-foreground bg-background py-4 text-base font-semibold text-foreground transition hover:bg-muted"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
