export const SHOP_ENDPOINTS = {
  byId: (id: number) => `/_c/shops/${id}`,
  header: (slug: string) => `/_c/shops/${slug}/header`,
  about: (id: number) => `/_c/shops/${id}/about`,
  promoCodes: (id: number) => `/_c/shops/${id}/promo-codes`,
  products: (id: number) => `/_c/shops/${id}/products`,
  filterOptions: (id: number) => `/_c/shops/${id}/filter-options`,
  follow: (id: number) => `/_c/shops/${id}/follow`,
} as const;
