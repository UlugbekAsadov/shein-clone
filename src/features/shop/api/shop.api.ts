import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IApiShop, IApiShopByIdData } from "@/features/shop/utils/shop-response.interface";
import { SHOP_ENDPOINTS } from "./shop.endpoints";

export const shopApi = {
  getById(id: number) {
    return apiClient.get<IApiResponse<IApiShopByIdData>>(
      SHOP_ENDPOINTS.byId(id),
      { skipAuth: true },
    );
  },
  getHeader(slug: string) {
    return apiClient.get<IApiResponse<IApiShop>>(
      SHOP_ENDPOINTS.header(slug),
      { skipAuth: true },
    );
  },
};
