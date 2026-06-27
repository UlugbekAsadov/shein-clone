"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shopStoriesApi } from "@/features/home/api/shop-stories.api";
import { getClientSessionId } from "@/lib/session-id";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IShopStory } from "@/features/home/utils/shop-story.interface";

export function useShopStories() {
  const { currency, lang } = useApiDeps();

  return useQuery<IShopStory[]>({
    queryKey: ["home-shop-stories", lang, currency],
    queryFn: async () => {
      try {
        const result = await shopStoriesApi.getAll(getClientSessionId());
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
