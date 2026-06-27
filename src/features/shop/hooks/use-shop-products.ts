"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type {
  IApiShopProductsData,
  IApiShopProductsResponse,
} from "@/features/shop/utils/shop-response.interface";

export function useShopProducts(
  shopId: number | undefined,
  params?: Record<string, string | number | string[] | number[] | undefined>,
) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShopProductsData | null>({
    queryKey: ["shop-products", shopId, lang, currency, params ?? null],
    enabled: shopId != null,
    queryFn: async () => {
      try {
        const result: IApiShopProductsResponse = await shopApi.getProducts(
          shopId as number,
          params,
        );
        if (!result.data) return null;
        return { data: result.data, meta: result.meta };
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
