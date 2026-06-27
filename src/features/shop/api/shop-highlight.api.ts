import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IApiShopHighlight } from "@/features/shop/utils/shop-highlight.interface";
import { SHOP_HIGHLIGHT_ENDPOINTS } from "./shop-highlight.endpoints";

export const shopHighlightApi = {
  getByShop(shopId: number, sessionId: string) {
    return apiClient.get<IApiResponse<IApiShopHighlight[]>>(
      SHOP_HIGHLIGHT_ENDPOINTS.list(shopId),
      {
        searchParams: { session_id: sessionId },
      },
    );
  },
};
