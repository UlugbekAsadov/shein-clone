"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { bannerApi } from "@/features/home/api/banner.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IBanner } from "@/features/home/utils/banner.interface";

export function useBanners() {
  const { currency, lang } = useApiDeps();

  return useQuery<IBanner[]>({
    queryKey: ["banners", lang, currency],
    queryFn: async () => {
      try {
        const result = await bannerApi.getAll();
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
