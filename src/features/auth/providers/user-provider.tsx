"use client";

import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UserContext } from "@/features/auth/providers/user-context";
import {
  CURRENT_USER_QUERY_KEY,
  useCurrentUser,
} from "@/features/auth/hooks/use-current-user";
import type { IUserContextValue } from "@/features/auth/utils/user-context.interface";

interface IProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: IProps) {
  const queryClient = useQueryClient();
  const { data: user = null } = useCurrentUser();

  const value = useMemo<IUserContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      refresh: () =>
        queryClient.invalidateQueries({ queryKey: [CURRENT_USER_QUERY_KEY] }),
    }),
    [user, queryClient],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
