"use client";

import { useContext } from "react";
import { AdultDialogContext } from "@/shared/providers/adult-dialog-provider";
import type { IAdultDialogContextValue } from "@/types/adult.interface";

export function useAdultDialog(): IAdultDialogContextValue {
  const ctx = useContext(AdultDialogContext);
  if (ctx === undefined) {
    throw new Error("useAdultDialog must be used inside <AdultDialogProvider>");
  }
  return ctx;
}
