"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import type { IAuthDialogContextValue } from "@/features/auth/interfaces/auth-dialog-context.interface";

export const AuthDialogContext = createContext<
  IAuthDialogContextValue | undefined
>(undefined);

interface IProps {
  children: React.ReactNode;
}

export function AuthDialogProvider({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<IAuthDialogContextValue>(
    () => ({ isOpen, open, close }),
    [isOpen, open, close],
  );

  return (
    <AuthDialogContext.Provider value={value}>
      {children}
    </AuthDialogContext.Provider>
  );
}
