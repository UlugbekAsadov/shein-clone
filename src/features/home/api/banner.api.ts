import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { BANNER_CACHE_TAG, BANNER_ENDPOINTS } from "./banner.endpoints";
import type { IBanner } from "@/features/home/utils/banner.interface";

export const bannerApi = {
  getAll() {
    return apiClient.get<IApiResponse<IBanner[]>>(BANNER_ENDPOINTS.list, {
      skipAuth: true,
      next: { tags: [BANNER_CACHE_TAG] },
    });
  },
};

export { BANNER_CACHE_TAG };
