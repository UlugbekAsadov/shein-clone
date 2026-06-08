import { cache } from "react";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/core/api/api-config";
import { ApiError } from "@/core/api/api-error";
import { measurementApi } from "@/features/profile/pages/measurements/api/measurement.api";
import type { IMeasurements } from "@/features/profile/pages/measurements/utils/measurement.interface";

export const getUserMeasurements = cache(async (): Promise<IMeasurements | null> => {
  const store = await cookies();
  if (!store.get(AUTH_COOKIES.accessToken)?.value) return null;

  try {
    const result = await measurementApi.get();
    return result.data ?? null;
  } catch (error) {
    if (error instanceof ApiError && error.isUnauthorized) return null;
    throw error;
  }
});
