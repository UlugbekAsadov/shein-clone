import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import {
  CATEGORY_CACHE_TAG,
  CATEGORY_ENDPOINTS,
  CATEGORY_FILTER_OPTIONS_CACHE_TAG,
} from "./category.endpoints";

export const categoryApi = {
  getAll() {
    return apiClient.get<IApiResponse<ICategory[]>>(CATEGORY_ENDPOINTS.list, {
      skipAuth: true,
      next: { tags: [CATEGORY_CACHE_TAG] },
    });
  },

  getFilterOptions(params?: Record<string, string>) {
    return apiClient.get<IApiResponse<IApiFilterOptions>>(
      CATEGORY_ENDPOINTS.filterOptions,
      {
        skipAuth: true,
        searchParams: params,
        next: { tags: [CATEGORY_FILTER_OPTIONS_CACHE_TAG] },
      },
    );
  },
};
