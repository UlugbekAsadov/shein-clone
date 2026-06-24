import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { FEATURED_SHOPS_CACHE_TAG, FEATURED_SHOPS_ENDPOINTS } from "./featured-shops.endpoints";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";

export const featuredShopsApi = {
  getAll(limit = 5) {
    return apiClient.get<IApiResponse<IApiFeaturedShop[]>>(
      FEATURED_SHOPS_ENDPOINTS.list,
      {
        skipAuth: true,
        searchParams: { limit },
        next: { tags: [FEATURED_SHOPS_CACHE_TAG] },
      },
    );
  },
};

export { FEATURED_SHOPS_CACHE_TAG };
