import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type { IProductDetail } from "@/features/products/pages/[slug]/utils/product-detail.interface";
import type { ISimilarProductsData } from "@/features/products/pages/[slug]/utils/similar-product.interface";
import { PRODUCT_DETAIL_ENDPOINTS } from "./products-detail.endpoints";

export const productDetailApi = {
  getBySlug(slug: string, signal?: AbortSignal) {
    return apiClient.get<IApiResponse<IProductDetail>>(
      PRODUCT_DETAIL_ENDPOINTS.bySlug(slug),
      {
        skipAuth: true,
        searchParams: { variant_clothes: "true" },
        signal,
      },
    );
  },

  getSimilarProducts(id: number) {
    return apiClient.get<IApiResponse<ISimilarProductsData>>(
      PRODUCT_DETAIL_ENDPOINTS.similarProducts(id),
      { skipAuth: true },
    );
  },

  getRecommendedProducts(id: number) {
    return apiClient.get<IApiResponse<ISimilarProductsData>>(
      PRODUCT_DETAIL_ENDPOINTS.recommendedProducts(id),
      { skipAuth: true },
    );
  },
};
