"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type {
  ICartItemView,
  ICartTotals,
} from "@/features/cart/utils/cart.interface";
import { CartItemList } from "../cart-item-list";
import { CartMobileHeader } from "./cart-mobile-header";
import { CartMobileCheckoutBar } from "./cart-mobile-checkout-bar";

interface IProps {
  lang: string;
  dict: IDictionary["cart"];
  navTitle: string;
  items: ICartItemView[];
  totals: ICartTotals;
  minOrderAmount: number | null;
  selectedKeys: Set<number>;
  clearing: boolean;
  onToggleSelect: (skuId: number) => void;
  onQtyChange: (item: ICartItemView, count: number) => void;
  onClear: () => void;
}

export function CartMobileView({
  lang,
  dict,
  navTitle,
  items,
  totals,
  minOrderAmount,
  selectedKeys,
  clearing,
  onToggleSelect,
  onQtyChange,
  onClear,
}: IProps) {
  return (
    <div className="md:hidden">
      <CartMobileHeader
        title={navTitle}
        clearing={clearing}
        onClear={onClear}
      />

      <div className="px-3 pt-2 pb-72">
        <CartItemList
          items={items}
          dict={dict}
          lang={lang}
          selectedKeys={selectedKeys}
          onToggleSelect={onToggleSelect}
          onQtyChange={onQtyChange}
        />
      </div>

      <CartMobileCheckoutBar
        totals={totals}
        minOrderAmount={minOrderAmount}
        dict={dict}
      />
    </div>
  );
}
