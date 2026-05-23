export const ADDRESS_ENDPOINTS = {
  list: "/_c/addresses",
  store: "/_c/addresses",
  show: (id: number | string) => `/_c/addresses/${id}`,
  update: (id: number | string) => `/_c/addresses/${id}`,
  destroy: (id: number | string) => `/_c/addresses/${id}`,
  setDefault: (id: number | string) => `/_c/addresses/${id}/set-default`,
} as const;

export const ADDRESS_CACHE_TAG = "user-addresses";
