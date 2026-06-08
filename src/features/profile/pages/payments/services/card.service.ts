import { cache } from "react";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/core/api/api-config";
import { ApiError } from "@/core/api/api-error";
import { cardApi } from "@/features/profile/pages/payments/api/card.api";
import type { ICard } from "@/features/profile/pages/payments/utils/card.interface";

export const getUserCards = cache(async (): Promise<ICard[]> => {
  const store = await cookies();
  if (!store.get(AUTH_COOKIES.accessToken)?.value) return [];

  try {
    const result = await cardApi.getAll();
    return result.data ?? [];
  } catch (error) {
    if (error instanceof ApiError && error.isUnauthorized) return [];
    throw error;
  }
});
