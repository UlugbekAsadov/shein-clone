"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import type { IProductVariant } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import { getVariantImages } from "@/features/products/pages/[slug]/utils/variant.mapper";

interface IProductVariantContext {
  colorId: string;
  setColorId: (color: string) => void;
  galleryImages: string[];
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

  const galleryImages = getVariantImages(variants, colorId, fallbackImages);

  return (
    <ProductVariantContext.Provider value={{ colorId, setColorId, galleryImages }}>
      {children}
    </ProductVariantContext.Provider>
  );
}
