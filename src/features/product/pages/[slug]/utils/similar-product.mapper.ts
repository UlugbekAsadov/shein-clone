import type { IProduct } from "@/types/product.interface";
import type { ISimilarProductItem } from "./similar-product.interface";

export function mapSimilarProductToProduct(item: ISimilarProductItem): IProduct {
  return {
    id: String(item.id),
    slug: item.slug,
    title: item.title,
    subtitle: "",
    price: item.price,
    image: item.image_url,
    rating: item.rating,
    reviews: 0,
    badge: item.is_original ? "Original" : undefined,
    delivery: item.delivery_date_text,
    discountLabel: item.discount > 0 ? `${item.discount}%` : undefined,
  };
}
