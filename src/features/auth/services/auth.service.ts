import { cache } from "react";
import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/core/api/api-config";
import { ApiError } from "@/core/api/api-error";
import { authApi } from "@/features/auth/api/auth.api";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";

export const getCurrentUser = cache(async (): Promise<IAuthUser | null> => {
  const store = await cookies();
  if (!store.get(AUTH_COOKIES.accessToken)?.value) return null;

  try {
    const result = await authApi.getMe();
    const user = result.data;
    if (!user) return null;
    return { ...user, avatar: user.avatar ?? user.image };
  } catch (error) {
    if (error instanceof ApiError && error.isUnauthorized) return null;
    throw error;
  }
});

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return Boolean(store.get(AUTH_COOKIES.accessToken)?.value);
}
