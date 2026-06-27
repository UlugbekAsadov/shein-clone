"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopHighlightApi } from "@/features/shop/api/shop-highlight.api";
import { getClientSessionId } from "@/lib/session-id";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IApiShopHighlight } from "@/features/shop/utils/shop-highlight.interface";

export function useShopHighlights(shopId: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IApiShopHighlight[]>({
    queryKey: ["shop-highlights", shopId, lang, currency],
    enabled: shopId != null,
    queryFn: async () => {
      try {
        const result = await shopHighlightApi.getByShop(
          shopId as number,
          getClientSessionId(),
        );
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
