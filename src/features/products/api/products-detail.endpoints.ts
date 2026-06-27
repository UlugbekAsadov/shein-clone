export const PRODUCT_DETAIL_ENDPOINTS = {
  bySlug: (slug: string) => `/_c/products/${slug}`,
  similarProducts: (id: number) => `/_c/products/${id}/similar-products`,
  recommendedProducts: (id: number) => `/_c/products/${id}/recommended-products`,
  comments: (id: number) => `/_c/products/${id}/comments`,
  commentsFilterOptions: (id: number) =>
    `/_c/products/${id}/comments/filter-options`,
  likeComment: (commentId: string) => `/_c/comments/${commentId}/like`,
} as const;
