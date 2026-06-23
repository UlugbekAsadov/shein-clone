"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";
import type { ICartTotals } from "@/features/cart/utils/cart.interface";

interface IProps {
  totals: ICartTotals;
  deliveryDate: string;
  dict: IDictionary["cart"];
}

export function CartOrderSummary({ totals, deliveryDate, dict }: IProps) {
  const { currency } = useCurrency();

  return (
    <aside className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg font-bold">{dict.yourOrder}</h2>

      <dl className="mt-4 flex flex-col gap-3 text-sm">
        {deliveryDate && (
          <div className="flex items-center justify-between gap-2 border-b border-dashed border-border pb-3">
            <dt className="text-muted-foreground">{dict.deliveryDate}:</dt>
            <dd className="font-semibold">{deliveryDate}</dd>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <dt className="text-muted-foreground">
            {dict.products} ({totals.productsCount})
          </dt>
          <dd className="font-semibold">
            {formatPrice(totals.productsTotal, currency)}
          </dd>
        </div>
        {totals.discounts > 0 && (
          <div className="flex items-center justify-between gap-2 border-b border-dashed border-border pb-3">
            <dt className="text-muted-foreground">{dict.discounts}</dt>
            <dd className="font-semibold text-rose-500">
              -{formatPrice(totals.discounts, currency)}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="font-semibold">{dict.totalPrice}</span>
        <span className="text-lg font-bold">
          {formatPrice(totals.totalPrice, currency)}
        </span>
      </div>

      <Button
        type="button"
        size="lg"
        disabled
        className="mt-5 h-12 w-full rounded-lg text-base font-semibold"
      >
        {dict.next}
      </Button>
    </aside>
  );
}
