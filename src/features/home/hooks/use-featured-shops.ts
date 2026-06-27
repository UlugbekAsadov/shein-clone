"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { featuredShopsApi } from "@/features/home/api/featured-shops.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";

export function useFeaturedShops() {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiFeaturedShop[]>({
    queryKey: ["featured-shops", lang, currency],
    queryFn: async () => {
      try {
        const result = await featuredShopsApi.getAll();
        return Array.isArray(result.data) ? result.data : [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
