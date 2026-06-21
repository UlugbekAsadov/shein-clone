"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import type { IProductVariant } from "@/features/products/pages/[slug]/utils/product-detail.interface";

interface IProductVariantContext {
  colorId: string;
  setColorId: (color: string) => void;
  galleryImages: string[];
  activeImageIndex?: number;
}

const ProductVariantContext = createContext<IProductVariantContext>({
  colorId: "",
  setColorId: () => {},
  galleryImages: [],
});

export function useProductVariant() {
  return useContext(ProductVariantContext);
}

interface IProps {
  variants: IProductVariant[];
  fallbackImages: string[];
  children: ReactNode;
}

export function ProductVariantProvider({
  variants,
  fallbackImages,
  children,
}: IProps) {
  const searchParams = useSearchParams();

  const firstColor = variants[0]?.color ?? "";
  const validColors = new Set(variants.map((v) => v.color));
  const urlColor = searchParams.get("color") ?? "";
  const [colorId, setColorId] = useState(
    validColors.has(urlColor) ? urlColor : firstColor,
  );

  const variantImages = useMemo(
    () => variants.map((variant) => variant.image_url),
    [variants],
  );

  const hasVariants = variants.length > 0;
  const galleryImages = hasVariants ? variantImages : fallbackImages;
  const activeImageIndex = hasVariants
    ? Math.max(0, variants.findIndex((variant) => variant.color === colorId))
    : undefined;

  return (
    <ProductVariantContext.Provider
      value={{ colorId, setColorId, galleryImages, activeImageIndex }}
    >
      {children}
    </ProductVariantContext.Provider>
  );
}
