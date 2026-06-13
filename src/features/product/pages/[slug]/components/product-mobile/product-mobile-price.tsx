"use client";

import type { ICurrencyPrices } from "@/types/currency-prices.interface";
import { useCurrency } from "@/shared/hooks/use-currency";
import { formatPrice } from "@/shared/utils/format-price";

interface IProps {
  prices: ICurrencyPrices;
  originalPrices?: ICurrencyPrices;
}

export function ProductMobilePrice({ prices, originalPrices }: IProps) {
  const { currency } = useCurrency();

  return (
    <div className="mt-4 flex items-center gap-3">
      <span className="text-2xl font-bold text-foreground">
        {formatPrice(prices[currency], currency)}
      </span>
      {originalPrices && (
        <span className="text-base text-muted-foreground line-through">
          {formatPrice(originalPrices[currency], currency)}
        </span>
      )}
      {originalPrices && (
        <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {formatPrice(originalPrices[currency] - prices[currency], currency)}
        </span>
      )}
    </div>
  );
}
