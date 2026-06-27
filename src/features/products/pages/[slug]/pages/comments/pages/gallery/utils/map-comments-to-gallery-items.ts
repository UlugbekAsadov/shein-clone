import { mapCommentToReview } from "@/features/products/pages/[slug]/utils/map-comment-to-review";
import type { IProductComment } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { IGalleryItem } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";

export function mapCommentsToGalleryItems(
  comments: IProductComment[],
): IGalleryItem[] {
  return comments.flatMap((comment) => {
    const review = mapCommentToReview(comment);
    return comment.images.map((src, index) => ({
      id: `${comment.id}-${index}`,
      type: "image" as const,
      src,
      review,
    }));
  });
}
