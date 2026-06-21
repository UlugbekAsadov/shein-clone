export const PRODUCT_DETAIL_ENDPOINTS = {
  bySlug: (slug: string) => `/_c/products/${slug}`,
  similarProducts: (id: number) => `/_c/products/${id}/similar-products`,
  recommendedProducts: (id: number) => `/_c/products/${id}/recommended-products`,
} as const;
