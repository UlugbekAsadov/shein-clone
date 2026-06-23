export const CART_ENDPOINTS = {
  base: "/_c/cart",
  ids: "/_c/cart/ids",
  product: (productId: number | string) => `/_c/cart/products/${productId}`,
} as const;

export const CART_CACHE_TAG = "cart";
