"use client";

import { createContext, useState } from "react";
import { currencies } from "@/shared/constants/currencies.constants";

export const CurrencyContext = createContext<{
  currency: (typeof currencies)[number];
  setCurrency: (c: (typeof currencies)[number]) => void;
}>({
  currency: "USD",
  setCurrency: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export function CurrencyProvider({ children }: IProps) {
  const [currency, setCurrency] = useState<(typeof currencies)[number]>("USD");
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
