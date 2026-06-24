"use client";

import { Box } from "@solar-icons/react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { useCurrency } from "@/shared/hooks/use-currency";
import { formatPrice } from "@/shared/utils/format-price";

interface IProps {
  amount: number;
  currentTotal: number;
  dict: IDictionary["cart"];
}

export function CartMinOrderBanner({ amount, currentTotal, dict }: IProps) {
  const { currency } = useCurrency();
  const progress = Math.min(100, Math.max(0, (currentTotal / amount) * 100));

  return (
    <div className="rounded-[20px] bg-secondary p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-lg font-medium">
          <Box className="size-5 text-foreground" weight="Outline" />
          {dict.minOrderAmount}
        </div>
        <span className="text-lg font-bold whitespace-nowrap">
          {formatPrice(amount, currency)}
        </span>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#DEDEE4]">
        <div
          className="h-full rounded-full bg-[#1FC16B] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
