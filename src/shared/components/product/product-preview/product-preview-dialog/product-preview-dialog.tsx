"use client";

import { useEffect, useState } from "react";
import type { IProduct } from "@/types/product.interface";
import { XIcon } from "@/shared/components/icons/outline";
import { TRANSITION_MS } from "@/shared/constants/product-preview.constants";
import { cn } from "@/lib/utils";
import { useProductDetail } from "@/features/products/hooks/use-product-detail";
import { ProductVariantProvider } from "@/features/products/pages/[slug]/providers/product-variant.provider";
import { ProductGalleryPanel } from "@/features/products/pages/[slug]/components/product-gallery-panel";
import { ProductInfoPanel } from "@/features/products/pages/[slug]/components/product-info/product-info-panel";
import { ProductPreviewSkeleton } from "./product-preview-skeleton";

interface IProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
}

export function ProductPreviewDialog({ product, open, onClose }: IProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const slug = product.slug ?? String(product.id);
  const { data, loading, error } = useProductDetail(slug, mounted);

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

  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm ",
        closing ? "dialog-overlay-exit" : "dialog-overlay-enter",
      )}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative max-h-[80vh] w-full max-w-315 overflow-hidden rounded-3xl bg-background shadow-2xl p-6 md:p-7.5",
          closing ? "dialog-content-exit" : "dialog-content-enter",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="z-20 grid cursor-pointer place-items-center rounded-full text-foreground ml-auto"
        >
          <XIcon className="size-6" />
        </button>

        <div className="mt-5 max-h-[calc(80vh-5rem)] overflow-y-auto pr-1">
          {data ? (
            <ProductVariantProvider
              variants={data.variant_clothes}
              fallbackImages={[data.image_url, ...data.additional_images]}
            >
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <ProductGalleryPanel alt={data.title} />
                <ProductInfoPanel product={data} syncToUrl={false} />
              </div>
            </ProductVariantProvider>
          ) : error && !loading ? (
            <div className="grid place-items-center py-20 text-center">
              <p className="text-secondary-foreground">
                Couldn&apos;t load this product. Please try again.
              </p>
            </div>
          ) : (
            <ProductPreviewSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
