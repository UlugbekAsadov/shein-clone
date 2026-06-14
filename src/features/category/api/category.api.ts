import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import type { IApiCategorySectionData } from "@/features/category/pages/[slug]/utils/category-section.interface";
import {
  CATEGORY_CACHE_TAG,
  CATEGORY_ENDPOINTS,
  CATEGORY_SECTION_CACHE_TAG,
} from "./category.endpoints";

export const categoryApi = {
  getAll() {
    return apiClient.get<IApiResponse<ICategory[]>>(CATEGORY_ENDPOINTS.list, {
      skipAuth: true,
      next: { tags: [CATEGORY_CACHE_TAG] },
    });
  },

  getSection(slug: string, page = 1) {
    return apiClient.get<IApiResponse<IApiCategorySectionData>>(
      `${CATEGORY_ENDPOINTS.section}/${slug}`,
      {
        skipAuth: true,
        searchParams: { page },
        next: { tags: [`${CATEGORY_SECTION_CACHE_TAG}-${slug}`] },
      },
    );
  },
};
