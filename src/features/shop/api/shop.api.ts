import { apiClient } from "@/core/api/api-client";
import type { IApiResponse } from "@/core/api/interfaces/api-response.interface";
import type {
  IApiShop,
  IApiShopAbout,
  IApiShopByIdData,
  IApiShopPromoCode,
  IApiShopProductsResponse,
  IApiShopFilterOptions,
} from "@/features/shop/utils/shop-response.interface";
import { SHOP_ENDPOINTS } from "./shop.endpoints";

export const shopApi = {
  getById(id: number) {
    return apiClient.get<IApiResponse<IApiShopByIdData>>(
      SHOP_ENDPOINTS.byId(id),
      { skipAuth: true },
    );
  },
  getHeader(slug: string) {
    return apiClient.get<IApiResponse<IApiShop>>(
      SHOP_ENDPOINTS.header(slug),
      { skipAuth: true },
    );
  },
  getAbout(id: number) {
    return apiClient.get<IApiResponse<IApiShopAbout>>(
      SHOP_ENDPOINTS.about(id),
      { skipAuth: true },
    );
  },
  getPromoCodes(id: number) {
    return apiClient.get<IApiResponse<IApiShopPromoCode[]>>(
      SHOP_ENDPOINTS.promoCodes(id),
      { skipAuth: true },
    );
  },
  getProducts(id: number, searchParams?: Record<string, string | number | string[] | number[] | undefined>) {
    return apiClient.get<IApiShopProductsResponse>(
      SHOP_ENDPOINTS.products(id),
      { skipAuth: true, searchParams },
    );
  },
  getFilterOptions(id: number, searchParams?: Record<string, string | number | string[] | number[] | undefined>) {
    return apiClient.get<IApiResponse<IApiShopFilterOptions>>(
      SHOP_ENDPOINTS.filterOptions(id),
      { skipAuth: true, searchParams },
    );
  },
  toggleFollow(id: number) {
    return apiClient.post<IApiResponse<null>>(SHOP_ENDPOINTS.follow(id));
  },
};
