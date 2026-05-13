"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { IProduct } from "@/types/product.interface";
import { galleryPool } from "@/shared/mocks/product-preview.mocks";
import { TRANSITION_MS } from "@/shared/constants/product-preview.constants";
import { cn } from "@/lib/utils";
import { ProductPreviewGallery } from "./product-preview-gallery";
import { ProductPreviewInfo } from "./product-preview-info";

interface IProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
}

export function ProductPreviewDialog({ product, open, onClose }: IProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

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
          <X className="size-6" />
        </button>

        <div className="grid max-h-[80vh] grid-cols-1 gap-10 md:grid-cols-2 mt-5">
          <ProductPreviewGallery images={galleryPool} alt={product.title} />

          <ProductPreviewInfo product={product} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
