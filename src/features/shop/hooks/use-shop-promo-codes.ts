"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiShopPromoCode } from "@/features/shop/utils/shop-response.interface";

export function useShopPromoCodes(shopId: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShopPromoCode[]>({
    queryKey: ["shop-promo-codes", shopId, lang, currency],
    enabled: shopId != null,
    queryFn: async () => {
      try {
        const result = await shopApi.getPromoCodes(shopId as number);
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
