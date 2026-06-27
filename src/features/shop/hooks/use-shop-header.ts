"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";

export function useShopHeader(slug: string | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShop | null>({
    queryKey: ["shop-header", slug, lang, currency],
    enabled: slug != null,
    queryFn: async () => {
      try {
        const result = await shopApi.getHeader(slug as string);
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
