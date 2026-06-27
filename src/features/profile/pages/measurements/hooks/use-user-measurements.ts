"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { measurementApi } from "@/features/profile/pages/measurements/api/measurement.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IMeasurements } from "@/features/profile/pages/measurements/utils/measurement.interface";

export function useUserMeasurements() {
  const { currency, lang } = useApiDeps();

  return useQuery<IMeasurements | null>({
    queryKey: ["user-measurements", lang, currency],
    queryFn: async () => {
      try {
        const result = await measurementApi.get();
        return result.data ?? null;
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) return null;
        throw error;
      }
    },
  });
}
