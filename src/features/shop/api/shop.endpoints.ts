export const SHOP_ENDPOINTS = {
  byId: (id: number) => `/_c/shops/${id}`,
  header: (slug: string) => `/_c/shops/${slug}/header`,
} as const;
