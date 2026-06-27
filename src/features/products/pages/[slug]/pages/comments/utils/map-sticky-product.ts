import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { IProductDetailUI } from "@/features/products/pages/[slug]/pages/comments/utils/product-detail.interface";

export function toStickyProduct(product: IProductDetail): IProductDetailUI {
  return {
    id: String(product.id),
    slug: product.slug,
    title: product.title,
    subtitle: "",
    rating: product.rating,
    reviews: product.reviews_count,
    sold: product.sold_count,
    price: product.price,
    gallery: [product.image_url, ...product.additional_images],
    colors: [],
    sizes: [],
    recommendedSize: "",
    specs: [],
    accordions: [],
  };
}
