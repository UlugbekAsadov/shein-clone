"use client";

import { useContext } from "react";
import { CurrencyContext } from "@/shared/providers/currency-provider";

export function useCurrency() {
  return useContext(CurrencyContext);
}
