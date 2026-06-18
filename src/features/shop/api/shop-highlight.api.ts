import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IApiShopHighlightsPage } from "@/features/shop/utils/shop-highlight.interface";
import { SHOP_HIGHLIGHT_ENDPOINTS } from "./shop-highlight.endpoints";

export const shopHighlightApi = {
  getByShop(shopId: number, sessionId: string) {
    return apiClient.get<IApiResponse<IApiShopHighlightsPage>>(
      SHOP_HIGHLIGHT_ENDPOINTS.list(shopId),
      {
        skipAuth: true,
        searchParams: { session_id: sessionId },
      },
    );
  },
};
