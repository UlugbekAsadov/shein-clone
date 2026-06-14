"use client";

import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";

interface IProps {
  price: number;
  originalPrice?: number;
}

export function ProductMobilePrice({ price, originalPrice }: IProps) {
  const { currency } = useCurrency();
  return (
    <div className="mt-4 flex items-center gap-3">
      <span className="text-2xl font-bold text-foreground">
        {formatPrice(price, currency)}
      </span>
      {originalPrice && (
        <span className="text-base text-muted-foreground line-through">
          {formatPrice(originalPrice, currency)}
        </span>
      )}
      {originalPrice && (
        <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {formatPrice(originalPrice - price, currency)}
        </span>
      )}
    </div>
  );
}
