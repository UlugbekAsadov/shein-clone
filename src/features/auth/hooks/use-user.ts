"use client";

import { useContext } from "react";
import { UserContext } from "@/features/auth/providers/user-context";
import type { IUserContextValue } from "@/features/auth/utils/user-context.interface";

export function useUser(): IUserContextValue {
  const ctx = useContext(UserContext);
  if (ctx === undefined) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
}
