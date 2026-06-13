import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CATEGORY_CACHE_TAG, CATEGORY_ENDPOINTS } from "./category.endpoints";

export const categoryApi = {
  getAll() {
    return apiClient.get<IApiResponse<ICategory[]>>(CATEGORY_ENDPOINTS.list, {
      skipAuth: true,
      next: { tags: [CATEGORY_CACHE_TAG] },
    });
  },
};
