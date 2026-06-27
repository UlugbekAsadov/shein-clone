"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { storyApi } from "@/features/home/api/story.api";
import { getClientSessionId } from "@/lib/session-id";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IStory } from "@/features/home/utils/story.interface";

export function useShopStories(shopId: number | undefined) {
  const { currency, lang } = useApiDeps();

  return useQuery<IStory[]>({
    queryKey: ["shop-stories", shopId, lang, currency],
    enabled: shopId != null,
    queryFn: async () => {
      try {
        const result = await storyApi.getByShop(
          shopId as number,
          getClientSessionId(),
        );
        return result.data?.stories ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
