import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IProductDetail } from "@/features/product/pages/[slug]/utils/product-detail.interface";
import { PRODUCT_DETAIL_ENDPOINTS } from "./products-detail.endpoints";

export const productDetailApi = {
  getBySlug(slug: string) {
    return apiClient.get<IApiResponse<IProductDetail>>(
      PRODUCT_DETAIL_ENDPOINTS.bySlug(slug),
      {
        skipAuth: true,
        searchParams: { variant_clothes: "true" },
      },
    );
  },
};
