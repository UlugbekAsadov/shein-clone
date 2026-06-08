export const CARD_ENDPOINTS = {
  list: "/_c/cards",
  store: "/_c/cards",
  destroy: (id: number | string) => `/_c/cards/${id}`,
  setDefault: (id: number | string) => `/_c/cards/${id}/set-default`,
} as const;

export const CARD_CACHE_TAG = "user-cards";
