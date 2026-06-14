"use client";

import { createContext, useEffect, useState } from "react";
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

function readCurrencyCookie(): (typeof currencies)[number] {
  const match = document.cookie.match(/(?:^|; )currency=([^;]*)/);
  const saved = match ? decodeURIComponent(match[1]) : null;
  return currencies.includes(saved as (typeof currencies)[number])
    ? (saved as (typeof currencies)[number])
    : "USD";
}

function writeCurrencyCookie(c: (typeof currencies)[number]) {
  document.cookie = `currency=${c}; path=/; SameSite=Lax; max-age=31536000`;
}

export function CurrencyProvider({ children }: IProps) {
  const [currency, setCurrencyState] =
    useState<(typeof currencies)[number]>("USD");

  useEffect(() => {
    const saved = readCurrencyCookie();
    setCurrencyState(saved);
  }, []);

  function setCurrency(c: (typeof currencies)[number]) {
    setCurrencyState(c);
    writeCurrencyCookie(c);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
