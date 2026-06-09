import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { SHOP_STORIES_CACHE_TAG, SHOP_STORIES_ENDPOINTS } from "./shop-stories.endpoints";
import type { IShopStoriesPage } from "@/features/home/utils/shop-story.interface";

export const shopStoriesApi = {
  getAll(sessionId: string) {
    return apiClient.get<IApiResponse<IShopStoriesPage>>(
      SHOP_STORIES_ENDPOINTS.list,
      {
        skipAuth: true,
        searchParams: { session_id: sessionId },
        next: { tags: [SHOP_STORIES_CACHE_TAG] },
      },
    );
  },
};

export { SHOP_STORIES_CACHE_TAG };
