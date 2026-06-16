export const PRODUCT_DETAIL_ENDPOINTS = {
  bySlug: (slug: string) => `/_c/products/${slug}`,
} as const;
