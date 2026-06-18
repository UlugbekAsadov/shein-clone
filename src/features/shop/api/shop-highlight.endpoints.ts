export const SHOP_HIGHLIGHT_ENDPOINTS = {
  list: (shopId: number) => `/_c/shops/${shopId}/highlights`,
} as const;
