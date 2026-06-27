"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { cardApi } from "@/features/profile/pages/payments/api/card.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";

export function useUserCards() {
  const { currency, lang } = useApiDeps();

  return useQuery<ICard[]>({
    queryKey: ["user-cards", lang, currency],
    queryFn: async () => {
      try {
        const result = await cardApi.getAll();
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) return [];
        throw error;
      }
    },
  });
}
