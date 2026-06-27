import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import { PRODUCT_SECTIONS_CACHE_TAG, PRODUCT_SECTIONS_ENDPOINTS } from "./product-sections.endpoints";
import type { IProductSection } from "@/features/home/utils/product-section.interface";

export const productSectionsApi = {
  getAll() {
    return apiClient.get<IApiResponse<IProductSection[]>>(
      PRODUCT_SECTIONS_ENDPOINTS.list,
      {
        next: { tags: [PRODUCT_SECTIONS_CACHE_TAG] },
      },
    );
  },
};

export { PRODUCT_SECTIONS_CACHE_TAG };
