"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Cart3 } from "@solar-icons/react";
import { toast } from "sonner";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";
import { useCart } from "@/features/cart/hooks/use-cart";
import { useMinOrderAmount } from "@/features/cart/hooks/use-min-order-amount";
import { computeCartTotals } from "@/features/cart/utils/cart.helpers";
import type { ICartItemView } from "@/features/cart/utils/cart.interface";
import { CartHeaderBar } from "./cart-header-bar";
import { CartItemList } from "./cart-item-list";
import { CartMinOrderBanner } from "./cart-min-order-banner";
import { CartMobileView } from "./cart-mobile/cart-mobile-view";
import { CartOrderSummary } from "./cart-order-summary";
import { CartSkeleton } from "./cart-skeleton";
import { ClearCartDialog } from "./clear-cart-dialog";

interface IProps {
  lang: string;
  dict: IDictionary;
}

export function CartView({ lang, dict }: IProps) {
  const { items, count, loading, update, remove, clear } = useCart();
  const minOrderAmount = useMinOrderAmount();
  const [selectedKeys, setSelectedKeys] = useState<Set<number>>(new Set());
  const [clearing, setClearing] = useState(false);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const prevKeysRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    setSelectedKeys((prev) => {
      const next = new Set<number>();
      for (const item of items) {
        const key = item.line.sku_id;
        const isNew = !prevKeysRef.current.has(key);
        if (item.isAvailable && (isNew || prev.has(key))) next.add(key);
      }
      return next;
    });
    prevKeysRef.current = new Set(items.map((item) => item.line.sku_id));
  }, [items]);

  const availableItems = useMemo(
    () => items.filter((item) => item.isAvailable),
    [items],
  );
  const selectedItems = useMemo(
    () => items.filter((item) => selectedKeys.has(item.line.sku_id)),
    [items, selectedKeys],
  );
  const totals = useMemo(
    () => computeCartTotals(selectedItems),
    [selectedItems],
  );
  const allSelected =
    availableItems.length > 0 && selectedItems.length === availableItems.length;

  const summaryDeliveryDate = useMemo(() => {
    let best: ICartItemView | undefined;
    let bestDays = -Infinity;
    for (const item of selectedItems) {
      const days = Number(item.product.delivery_date_text);
      const value = Number.isFinite(days) ? days : 0;
      if (value > bestDays) {
        bestDays = value;
        best = item;
      }
    }
    return best?.product.delivery_date_text ?? "";
  }, [selectedItems]);

  function toggleSelect(skuId: number) {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(skuId)) next.delete(skuId);
      else next.add(skuId);
      return next;
    });
  }

  function toggleAll() {
    if (allSelected) setSelectedKeys(new Set());
    else setSelectedKeys(new Set(availableItems.map((item) => item.line.sku_id)));
  }

  async function handleQtyChange(item: ICartItemView, nextCount: number) {
    if (nextCount < 1) {
      const result = await remove(item.product.id);
      if (result.ok) toast.success(dict.cart.removed);
      else toast.error(result.message ?? "Couldn't remove item");
      return;
    }
    const result = await update(item.product.id, item.line.sku_id, nextCount);
    if (!result.ok) toast.error(result.message ?? "Couldn't update item");
  }

  async function handleClear() {
    setClearing(true);
    const result = await clear();
    setClearing(false);
    setConfirmClearOpen(false);
    if (result.ok) toast.success(dict.cart.cleared);
    else toast.error(result.message ?? "Couldn't clear cart");
  }

  if (loading && items.length === 0) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <PagePlaceholder
        icon={Cart3}
        title={dict.pagePlaceholder.cartTitle}
        description={dict.pagePlaceholder.cartDescription}
      />
    );
  }

  return (
    <>
      <div className="mx-auto hidden max-w-360 gap-6 px-6 py-8 md:grid lg:grid-cols-[1fr_460px]">
        <div className="flex flex-col gap-5">
          <CartHeaderBar
            count={count}
            allSelected={allSelected}
            clearing={clearing}
            dict={dict.cart}
            onToggleAll={toggleAll}
            onClear={() => setConfirmClearOpen(true)}
          />
          <CartItemList
            items={items}
            dict={dict.cart}
            lang={lang}
            selectedKeys={selectedKeys}
            onToggleSelect={toggleSelect}
            onQtyChange={handleQtyChange}
          />
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          {minOrderAmount !== null && minOrderAmount > 0 && (
            <CartMinOrderBanner
              amount={minOrderAmount}
              currentTotal={totals.totalPrice}
              dict={dict.cart}
            />
          )}
          <CartOrderSummary
            totals={totals}
            deliveryDate={summaryDeliveryDate}
            dict={dict.cart}
          />
        </div>
      </div>

      <CartMobileView
        lang={lang}
        dict={dict.cart}
        navTitle={dict.mobileNav.cart}
        items={items}
        totals={totals}
        minOrderAmount={minOrderAmount}
        selectedKeys={selectedKeys}
        clearing={clearing}
        onToggleSelect={toggleSelect}
        onQtyChange={handleQtyChange}
        onClear={() => setConfirmClearOpen(true)}
      />

      <ClearCartDialog
        open={confirmClearOpen}
        clearing={clearing}
        dict={dict.cart}
        onOpenChange={setConfirmClearOpen}
        onConfirm={handleClear}
      />
    </>
  );
}
