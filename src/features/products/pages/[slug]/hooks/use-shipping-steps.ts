"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { shippingApi } from "@/features/products/api/shipping.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IShippingStep } from "@/features/products/pages/[slug]/utils/shipping-step.interface";

export function useShippingSteps(enabled: boolean) {
  const { currency, lang } = useApiDeps();

  return useQuery<IShippingStep[]>({
    queryKey: ["shipping-steps", lang, currency],
    enabled,
    queryFn: async () => {
      try {
        const result = await shippingApi.getSteps();
        return result.data ?? [];
      } catch (error) {
        if (error instanceof ApiError) return [];
        throw error;
      }
    },
  });
}
