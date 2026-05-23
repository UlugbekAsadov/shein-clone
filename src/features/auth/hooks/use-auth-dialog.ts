"use client";

import { useContext } from "react";
import { AuthDialogContext } from "@/features/auth/providers/auth-dialog-provider";
import type { IAuthDialogContextValue } from "@/features/auth/utils/auth-dialog-context.interface";

export function useAuthDialog(): IAuthDialogContextValue {
  const ctx = useContext(AuthDialogContext);
  if (ctx === undefined) {
    throw new Error("useAuthDialog must be used inside <AuthDialogProvider>");
  }
  return ctx;
}
