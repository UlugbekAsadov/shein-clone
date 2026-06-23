import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { ICartData } from "@/features/cart/utils/cart.interface";
import { CART_ENDPOINTS } from "./cart.endpoints";

export const cartApi = {
  get(sessionId: string) {
    return apiClient.get<IApiResponse<ICartData>>(CART_ENDPOINTS.base, {
      searchParams: { session_id: sessionId },
    });
  },
  addOrUpdate(
    productId: number,
    skuId: number,
    count: number,
    sessionId: string,
  ) {
    return apiClient.put<IApiResponse<ICartData>>(
      CART_ENDPOINTS.product(productId),
      { session_id: sessionId, skus: [{ sku_id: skuId, count }] },
    );
  },
  remove(productId: number, sessionId: string) {
    return apiClient.delete<IApiResponse<ICartData>>(
      CART_ENDPOINTS.product(productId),
      { session_id: sessionId },
    );
  },
  clear(sessionId: string) {
    return apiClient.delete<IApiResponse<ICartData>>(CART_ENDPOINTS.base, {
      session_id: sessionId,
    });
  },
};
