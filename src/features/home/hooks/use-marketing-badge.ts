"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { marketingBadgeApi } from "@/features/home/api/marketing-badge.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";
import type { IMarketingBadge } from "@/features/home/utils/marketing-badge.interface";

export function useMarketingBadge() {
  const { currency, lang } = useApiDeps();
  const isMobile = useIsMobile();

  return useQuery<IMarketingBadge | null>({
    queryKey: ["marketing-badge", lang, currency],
    enabled: !isMobile,
    queryFn: async () => {
      try {
        const result = await marketingBadgeApi.get();
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError) return null;
        throw error;
      }
    },
  });
}
