import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import type { IApiCategorySectionData } from "@/features/category/pages/[slug]/utils/category-section.interface";
import type { IActiveFilters } from "@/features/category/pages/[slug]/utils/active-filters.interface";
import type { IApiFilterOptions } from "@/types/filter-options.interface";
import {
  CATEGORY_CACHE_TAG,
  CATEGORY_ENDPOINTS,
  CATEGORY_FILTER_OPTIONS_CACHE_TAG,
  CATEGORY_SECTION_CACHE_TAG,
} from "./category.endpoints";

export const categoryApi = {
  getAll() {
    return apiClient.get<IApiResponse<ICategory[]>>(CATEGORY_ENDPOINTS.list, {
      skipAuth: true,
      next: { tags: [CATEGORY_CACHE_TAG] },
    });
  },

  getSection(slug: string, page = 1, filters?: IActiveFilters) {
    const searchParams: Record<string, string | number | boolean | number[]> = { page };

    if (filters) {
      if (filters.categoryIds.length) searchParams["category_ids[]"] = filters.categoryIds;
      if (filters.brandIds.length) searchParams["brand_ids[]"] = filters.brandIds;
      if (filters.seasonIds.length) searchParams["season_ids[]"] = filters.seasonIds;
      if (filters.minPrice !== null) searchParams.min_price = filters.minPrice;
      if (filters.maxPrice !== null) searchParams.max_price = filters.maxPrice;
      if (filters.hasDiscount) searchParams.has_discount = 1;
      if (filters.isOriginal) searchParams.is_original = 1;
    }

    return apiClient.get<IApiResponse<IApiCategorySectionData>>(
      `${CATEGORY_ENDPOINTS.section}/${slug}`,
      {
        skipAuth: true,
        searchParams,
        next: { tags: [`${CATEGORY_SECTION_CACHE_TAG}-${slug}`] },
      },
    );
  },

  getFilterOptions() {
    return apiClient.get<IApiResponse<IApiFilterOptions>>(
      CATEGORY_ENDPOINTS.filterOptions,
      {
        skipAuth: true,
        next: { tags: [CATEGORY_FILTER_OPTIONS_CACHE_TAG] },
      },
    );
  },
};
