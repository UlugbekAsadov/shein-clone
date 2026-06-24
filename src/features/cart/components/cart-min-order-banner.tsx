"use client";

import { Box } from "@solar-icons/react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { useCurrency } from "@/shared/hooks/use-currency";
import { formatPrice } from "@/shared/utils/format-price";
import { cn } from "@/lib/utils";

interface IProps {
  amount: number;
  currentTotal: number;
  dict: IDictionary["cart"];
  className?: string;
}

export function CartMinOrderBanner({
  amount,
  currentTotal,
  dict,
  className,
}: IProps) {
  const { currency } = useCurrency();
  const progress = Math.min(100, Math.max(0, (currentTotal / amount) * 100));

  return (
    <div className={cn("rounded-[20px] bg-secondary p-5", className)}>
      <div className="flex items-center  md:justify-between gap-2 md:gap-3">
        <div className="flex items-center gap-2 text-xs md:text-lg font-medium">
          <Box className="size-5 text-foreground" weight="Outline" />
          {dict.minOrderAmount}
        </div>
        <span className="text-xs md:text-lg font-bold whitespace-nowrap">
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
