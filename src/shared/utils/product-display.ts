import type { IProduct } from "@/types/product.interface";

export function getProductImages(product: IProduct): string[] {
  if (product.images && product.images.length > 0) return product.images;
  return [product.image_url];
}

export function getOriginalPrice(
  price: number,
  discount: number,
  discountType: string,
): number | undefined {
  if (discount <= 0) return undefined;
  return discountType === "percent"
    ? price / (1 - discount / 100)
    : price + discount;
}

export function getProductOriginalPrice(product: IProduct): number | undefined {
  if (product.old_price && product.old_price > 0) return product.old_price;
  if (product.discount && product.discount > 0 && product.discount_type)
    return getOriginalPrice(
      product.price,
      product.discount,
      product.discount_type,
    );
  return undefined;
}

export function getProductDiscountLabel(product: IProduct): string | undefined {
  if (product.discount_percentage && product.discount_percentage > 0)
    return `${product.discount_percentage}%`;
  if (
    product.discount &&
    product.discount > 0 &&
    product.discount_type === "percent"
  )
    return `${product.discount}%`;
  return undefined;
}

export function getProductBadge(product: IProduct): "Original" | undefined {
  return product.is_original ? "Original" : undefined;
}

export function getProductReviews(product: IProduct): number {
  return product.reviews_count ?? 0;
}
