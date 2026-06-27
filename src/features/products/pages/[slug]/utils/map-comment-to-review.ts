import type { IProductComment } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { IReview } from "@/features/products/pages/[slug]/utils/review.interface";

export function mapCommentToReview(comment: IProductComment): IReview {
  return {
    id: String(comment.id),
    user: comment.user.name,
    date: comment.created_at,
    rating: comment.rating,
    meta: comment.specs.map((spec, index) => ({
      id: `${comment.id}-${index}`,
      label: spec.label,
      value: spec.value,
    })),
    text: comment.content,
    images: comment.images,
    countryFlag: comment.country?.flag ?? "",
    countryLabel: comment.country?.name ?? "",
    helpful: comment.helpful_count,
    sellerResponse: comment.shop_reply
      ? {
          shopName: comment.shop_reply.shop.name,
          date: comment.shop_reply.created_at,
          text: comment.shop_reply.content,
        }
      : undefined,
  };
}
