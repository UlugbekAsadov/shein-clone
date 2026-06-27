"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { addressApi } from "@/features/profile/pages/addresses/api/address.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IAddress } from "@/features/profile/pages/addresses/utils/address.interface";

export function useUserAddress(id: number | string) {
  const { currency, lang } = useApiDeps();

  return useQuery<IAddress | null>({
    queryKey: ["user-address", lang, currency, id],
    queryFn: async () => {
      try {
        const result = await addressApi.get(id);
        return result.data ?? null;
      } catch (error) {
        if (
          error instanceof ApiError &&
          (error.isUnauthorized || error.isNotFound)
        ) {
          return null;
        }
        throw error;
      }
    },
  });
}
