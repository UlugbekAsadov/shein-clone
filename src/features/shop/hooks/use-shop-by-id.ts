"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopApi } from "@/features/shop/api/shop.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";

export function useShopById(id: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShop | null>({
    queryKey: ["shop-by-id", id, lang, currency],
    enabled: id != null,
    queryFn: async () => {
      try {
        const result = await shopApi.getById(id as number);
        return result.data?.shop ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
