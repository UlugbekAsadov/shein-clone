"use client";

import { createContext, useCallback, useMemo, useState } from "react";
import type { IAdultDialogContextValue } from "@/types/adult.interface";

export const AdultDialogContext = createContext<
  IAdultDialogContextValue | undefined
>(undefined);

interface IProps {
  children: React.ReactNode;
}

export function AdultDialogProvider({ children }: IProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<IAdultDialogContextValue>(
    () => ({ isOpen, open, close }),
    [isOpen, open, close],
  );

  return (
    <AdultDialogContext.Provider value={value}>
      {children}
    </AdultDialogContext.Provider>
  );
}
