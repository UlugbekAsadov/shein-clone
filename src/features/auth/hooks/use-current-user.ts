"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/core/api/api-error";
import { authApi } from "@/features/auth/api/auth.api";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";

export const CURRENT_USER_QUERY_KEY = "current-user";

export function useCurrentUser() {
  const { lang } = useApiDeps();

  return useQuery<IAuthUser | null>({
    queryKey: [CURRENT_USER_QUERY_KEY, lang],
    queryFn: async () => {
      try {
        const result = await authApi.getMe();
        const user = result.data;
        if (!user) return null;
        return { ...user, avatar: user.avatar ?? user.image };
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) return null;
        throw error;
      }
    },
  });
}
