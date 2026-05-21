"use client";

import { createContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { IAuthUser } from "@/features/auth/interfaces/auth.interface";
import type { IUserContextValue } from "@/features/auth/interfaces/user-context.interface";

export const UserContext = createContext<IUserContextValue | undefined>(
  undefined,
);

interface IProps {
  user: IAuthUser | null;
  children: React.ReactNode;
}

export function UserProvider({ user, children }: IProps) {
  const router = useRouter();

  const value = useMemo<IUserContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      refresh: () => router.refresh(),
    }),
    [user, router],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
