import type { ISwatch } from "@/types/swatch.interface";
import type { ISize } from "@/types/size.interface";
import type {
  IProductVariant,
  IProductVariantSize,
} from "@/features/product/pages/[slug]/utils/product-detail.interface";

export function getVariantColorSwatches(
  variants: IProductVariant[],
): ISwatch[] {
  return variants.map((variant) => ({
    id: variant.color,
    name: variant.color,
    image: variant.image_url,
  }));
}

export function getVariantSizes(
  variants: IProductVariant[],
  color: string,
): ISize[] {
  const variant = variants.find((v) => v.color === color);
  if (!variant) return [];
  return variant.sizes.map((s) => ({ id: s.size, available: true }));
}

export function getVariantSizeDetail(
  variants: IProductVariant[],
  color: string,
  size: string,
): IProductVariantSize | undefined {
  const variant = variants.find((v) => v.color === color);
  return variant?.sizes.find((s) => s.size === size);
}

export function getVariantImages(
  variants: IProductVariant[],
  color: string,
  fallback: string[],
): string[] {
  const variant = variants.find((v) => v.color === color);
  if (!variant) return fallback;
  return [variant.image_url, ...variant.additional_images];
}
