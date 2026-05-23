import { cache } from "react";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/core/api/api-config";
import { ApiError } from "@/core/api/api-error";
import { addressApi } from "@/features/profile/pages/addresses/api/address.api";
import type { IAddress } from "@/features/profile/pages/addresses/utils/address.interface";

export const getUserAddresses = cache(async (): Promise<IAddress[]> => {
  const store = await cookies();
  if (!store.get(AUTH_COOKIES.accessToken)?.value) return [];

  try {
    const result = await addressApi.getAll();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof ApiError && error.isUnauthorized) return [];
    throw error;
  }
});

export const getUserAddress = cache(
  async (id: number | string): Promise<IAddress | null> => {
    const store = await cookies();
    if (!store.get(AUTH_COOKIES.accessToken)?.value) return null;

    try {
      const result = await addressApi.get(id);
      return result.data ?? null;
    } catch (error) {
      if (error instanceof ApiError && (error.isUnauthorized || error.isNotFound)) {
        return null;
      }
      throw error;
    }
  },
);
