"use client";

import { CartLarge2 } from "@solar-icons/react";
import { Button } from "@/shared/components/ui/button";
import type { ICurrencyPrices } from "@/types/currency-prices.interface";
import { useCurrency } from "@/shared/hooks/use-currency";
import { formatPrice } from "@/shared/utils/format-price";

interface IProps {
  label: string;
  prices: ICurrencyPrices;
  originalPrices?: ICurrencyPrices;
}

export function ProductMobileCta({ label, prices, originalPrices }: IProps) {
  const { currency } = useCurrency();

  return (
    <div className="sticky bottom-0 z-20 -mx-4 mt-4 bg-background p-3 pb-[max(env(safe-area-inset-bottom),1rem)] shadow-[0px_-4px_20px_0px_#A9B9C629]">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="text-xl font-bold text-foreground">
          {formatPrice(prices[currency], currency)}
        </span>
        {originalPrices && (
          <span className="text-xs font-bold text-muted-foreground line-through">
            {formatPrice(originalPrices[currency], currency)}
          </span>
        )}
        {originalPrices && (
          <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            {formatPrice(originalPrices[currency] - prices[currency], currency)}
          </span>
        )}
      </div>

      <Button
        type="button"
        size="lg"
        className="h-12.5 w-full rounded-[8px] text-lg font-medium"
      >
        <span>{label}</span>
        <CartLarge2 className="ml-1 size-6" />
      </Button>
    </div>
  );
}
