"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { addressApi } from "@/features/profile/pages/addresses/api/address.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IAddress } from "@/features/profile/pages/addresses/utils/address.interface";

export function useUserAddresses() {
  const { currency, lang } = useApiDeps();

  return useQuery<IAddress[]>({
    queryKey: ["user-addresses", lang, currency],
    queryFn: async () => {
      try {
        const result = await addressApi.getAll();
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) return [];
        throw error;
      }
    },
  });
}
