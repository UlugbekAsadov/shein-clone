import { apiClient } from "@/core/api/api-client";
import type { IApiProductsResponse } from "@/features/products/utils/products-response.interface";
import { PRODUCTS_ENDPOINTS } from "./products.endpoints";

export const productsApi = {
  getProducts(params: Record<string, string>, page = 1) {
    return apiClient.get<IApiProductsResponse>(
      PRODUCTS_ENDPOINTS.list,
      {
        skipAuth: true,
        searchParams: { ...params, page },
      },
    );
  },
};
