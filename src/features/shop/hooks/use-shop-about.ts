"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiShopAbout } from "@/features/shop/utils/shop-response.interface";

export function useShopAbout(shopId: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShopAbout | null>({
    queryKey: ["shop-about", shopId, lang, currency],
    enabled: shopId != null,
    queryFn: async () => {
      try {
        const result = await shopApi.getAbout(shopId as number);
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
