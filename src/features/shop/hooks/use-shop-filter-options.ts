"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiShopFilterOptions } from "@/features/shop/utils/shop-response.interface";

export function useShopFilterOptions(
  shopId: number | undefined,
  params?: Record<string, string | number | string[] | number[] | undefined>,
) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShopFilterOptions | null>({
    queryKey: ["shop-filter-options", shopId, lang, currency, params ?? null],
    enabled: shopId != null,
    queryFn: async () => {
      try {
        const result = await shopApi.getFilterOptions(shopId as number, params);
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
