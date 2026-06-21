"use client";

import { ProductPreviewGallery } from "@/shared/components/product/product-preview/product-preview-dialog/product-preview-gallery";
import { useProductVariant } from "@/features/products/pages/[slug]/providers/product-variant.provider";

interface IProps {
  alt: string;
}

export function ProductGalleryPanel({ alt }: IProps) {
  const { galleryImages } = useProductVariant();
  return <ProductPreviewGallery images={galleryImages} alt={alt} />;
}
