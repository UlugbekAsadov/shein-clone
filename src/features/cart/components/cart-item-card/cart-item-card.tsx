"use client";

import Image from "next/image";
import Link from "next/link";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { formatPrice } from "@/shared/utils/format-price";
import { useCurrency } from "@/shared/hooks/use-currency";
import { cn } from "@/lib/utils";
import type { ICartItemView } from "@/features/cart/utils/cart.interface";
import { getDeliveryDate } from "@/features/cart/utils/cart.helpers";
import { CartItemQtyStepper } from "./cart-item-qty-stepper";
import { CartItemOutOfStock } from "./cart-item-out-of-stock";

interface IProps {
  item: ICartItemView;
  dict: IDictionary["cart"];
  lang: string;
  selected: boolean;
  onToggleSelect: () => void;
  onQtyChange: (count: number) => void;
}

export function CartItemCard({
  item,
  dict,
  lang,
  selected,
  onToggleSelect,
  onQtyChange,
}: IProps) {
  const { currency } = useCurrency();
  const { product, line } = item;
  const productHref = `/${lang}/products/${product.slug ?? product.id}`;
  const deliveryDate = getDeliveryDate(product.delivery_date_text);

  return (
    <div
      className={cn(
        "rounded-[20px] bg-secondary p-4",
        !item.isAvailable && "ring-1 ring-rose-300",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-lg">
          {!item.isAvailable && (
            <span className="mr-2 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">
              {dict.outOfStock}
            </span>
          )}
          <span className="text-muted-foreground">{dict.deliveryDate}: </span>
          <span className="font-bold text-foreground">{deliveryDate}</span>
        </span>
        <Checkbox
          checked={selected}
          onCheckedChange={onToggleSelect}
          disabled={!item.isAvailable}
          aria-label="Select item"
          className="size-7 cursor-pointer rounded-[8px]"
        />
      </div>

      <div className="my-4 border-t-2 border-dashed border-border " />

      <div className="flex gap-4">
        <Link
          href={productHref}
          className="relative aspect-3/4 w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-44"
        >
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            quality={90}
            sizes="(max-width: 640px) 112px, 176px"
            className="object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col">
          <Link
            href={productHref}
            className="line-clamp-2 text-base font-bold leading-snug hover:underline sm:text-lg"
          >
            {product.title}
          </Link>

          <div className="mt-2 flex flex-col gap-1.5 text-sm">
            {line.color && (
              <div className="flex items-center">
                <span className="text-muted-foreground">{dict.color}:</span>
                <span className="ml-2 font-bold text-foreground">
                  {line.color}
                </span>
                <span
                  className="ml-2 inline-block size-4 rounded-[5px] ring-1 ring-black/10"
                  style={{ backgroundColor: line.color }}
                />
              </div>
            )}
            {line.size && (
              <div className="flex items-center">
                <span className="text-muted-foreground">{dict.size}:</span>
                <span className="ml-2 font-bold text-foreground">
                  {line.size}
                </span>
              </div>
            )}
            <div className="flex items-center">
              <span className="text-muted-foreground">{dict.qty}:</span>
              <span className="ml-2 font-bold text-foreground">
                {line.count}
              </span>
            </div>
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <div className="flex flex-col gap-0.5">
              {item.originalUnitPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(item.originalUnitPrice, currency)}
                </span>
              )}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-[22px] font-extrabold leading-none tracking-tight">
                  {formatPrice(item.unitPrice, currency)}
                </span>
                {item.savings > 0 && (
                  <span className="text-sm font-medium text-emerald-500">
                    {dict.save} {formatPrice(item.savings, currency)}
                  </span>
                )}
              </div>
            </div>

            <CartItemQtyStepper value={line.count} onChange={onQtyChange} />
          </div>
        </div>
      </div>

      {!item.isAvailable && (
        <CartItemOutOfStock
          note={dict.outOfStockNote}
          exploreLabel={dict.exploreSimilar}
          href={productHref}
        />
      )}
    </div>
  );
}
