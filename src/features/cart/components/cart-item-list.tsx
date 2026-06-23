"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { ICartItemView } from "@/features/cart/utils/cart.interface";
import { CartItemCard } from "./cart-item-card/cart-item-card";

interface IProps {
  items: ICartItemView[];
  dict: IDictionary["cart"];
  lang: string;
  selectedKeys: Set<number>;
  onToggleSelect: (skuId: number) => void;
  onQtyChange: (item: ICartItemView, count: number) => void;
}

export function CartItemList({
  items,
  dict,
  lang,
  selectedKeys,
  onToggleSelect,
  onQtyChange,
}: IProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <CartItemCard
          key={item.line.sku_id}
          item={item}
          dict={dict}
          lang={lang}
          selected={selectedKeys.has(item.line.sku_id)}
          onToggleSelect={() => onToggleSelect(item.line.sku_id)}
          onQtyChange={(count) => onQtyChange(item, count)}
        />
      ))}
    </div>
  );
}
