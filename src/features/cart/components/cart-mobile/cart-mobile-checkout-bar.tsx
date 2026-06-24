"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { useCurrency } from "@/shared/hooks/use-currency";
import { formatPrice } from "@/shared/utils/format-price";
import type { ICartTotals } from "@/features/cart/utils/cart.interface";
import { CartMinOrderBanner } from "../cart-min-order-banner";

interface IProps {
  totals: ICartTotals;
  minOrderAmount: number | null;
  dict: IDictionary["cart"];
}

export function CartMobileCheckoutBar({
  totals,
  minOrderAmount,
  dict,
}: IProps) {
  const { currency } = useCurrency();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 rounded-t-[20px] bg-background px-4 pt-4 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] shadow-[0px_-4px_20px_0px_#A9B9C629] md:hidden">
      {minOrderAmount !== null && minOrderAmount > 0 && (
        <>
          <CartMinOrderBanner
            amount={minOrderAmount}
            currentTotal={totals.totalPrice}
            dict={dict}
            className="bg-transparent p-0"
          />
          <div className="my-3 border-t border-dashed border-[#DEDEE4]" />
        </>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="md:text-2xl font-extrabold leading-tight tracking-tight">
            {formatPrice(totals.totalPrice, currency)}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            {totals.productsCount} {dict.items}
          </span>
        </div>

        <Button
          type="button"
          size="lg"
          disabled
          className="h-10.5 min-w-32 rounded-[11px] text-base font-semibold"
        >
          {dict.next}
        </Button>
      </div>
    </div>
  );
}
