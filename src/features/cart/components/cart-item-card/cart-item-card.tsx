"use client";

import Image from "next/image";
import Link from "next/link";
import { TrashBinMinimalistic } from "@solar-icons/react";
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
  pending: boolean;
  onToggleSelect: () => void;
  onQtyChange: (count: number) => void;
  onRemove: () => void;
}

export function CartItemCard({
  item,
  dict,
  lang,
  selected,
  pending,
  onToggleSelect,
  onQtyChange,
  onRemove,
}: IProps) {
  const { currency } = useCurrency();
  const { product, line } = item;
  const productHref = `/${lang}/products/${product.slug ?? product.id}`;
  const deliveryDate = getDeliveryDate(product.delivery_date_text);

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-4",
        item.isAvailable ? "border-border" : "border-rose-300",
      )}
    >
      <div className="flex items-center justify-between gap-2 pb-3">
        <div className="flex items-center gap-2">
          {!item.isAvailable && (
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-600">
              {dict.outOfStock}
            </span>
          )}
          {deliveryDate && (
            <span className="text-sm text-foreground">
              {dict.deliveryDate}:{" "}
              <span className="font-semibold">{deliveryDate}</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onRemove}
            disabled={pending}
            aria-label="Remove item"
            className="grid size-8 cursor-pointer place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-foreground disabled:opacity-50"
          >
            <TrashBinMinimalistic className="size-5" weight="Outline" />
          </button>
          <Checkbox
            checked={selected}
            onCheckedChange={onToggleSelect}
            disabled={!item.isAvailable}
            aria-label="Select item"
          />
        </div>
      </div>

      <div className="flex gap-4 border-t border-border pt-3">
        <Link
          href={productHref}
          className="relative aspect-3/4 w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
        >
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            quality={90}
            sizes="96px"
            className="object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-1">
          <Link
            href={productHref}
            className="line-clamp-2 text-sm font-medium leading-snug hover:underline"
          >
            {product.title}
          </Link>

          <div className="mt-1 flex flex-col gap-0.5 text-xs text-muted-foreground">
            {line.color && (
              <span>
                {dict.color}:{" "}
                <span className="font-medium text-foreground">{line.color}</span>
              </span>
            )}
            {line.size && (
              <span>
                {dict.size}:{" "}
                <span className="font-medium text-foreground">{line.size}</span>
              </span>
            )}
          </div>

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="flex flex-col gap-1">
              {item.originalUnitPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(item.originalUnitPrice, currency)}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-foreground">
                  {formatPrice(item.unitPrice, currency)}
                </span>
                {item.savings > 0 && (
                  <span className="text-xs font-semibold text-emerald-600">
                    {formatPrice(item.originalUnitPrice! - item.unitPrice, currency)}
                  </span>
                )}
              </div>
            </div>

            <CartItemQtyStepper
              value={line.count}
              disabled={pending}
              onChange={onQtyChange}
            />
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
