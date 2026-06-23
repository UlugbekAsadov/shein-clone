"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useCurrency } from "@/shared/hooks/use-currency";
import { useUser } from "@/features/auth/hooks/use-user";
import type { IActionResult } from "@/types/action-result.interface";
import {
  addToCartAction,
  clearCartAction,
  getCartAction,
  removeCartItemAction,
  updateCartItemAction,
} from "@/features/cart/services/cart.actions";
import {
  buildCartItemViews,
  computeCartTotals,
} from "@/features/cart/utils/cart.helpers";
import type {
  ICartContextValue,
  ICartData,
} from "@/features/cart/utils/cart.interface";

export const CartContext = createContext<ICartContextValue | undefined>(
  undefined,
);

interface IProps {
  children: ReactNode;
}

export function CartProvider({ children }: IProps) {
  const { currency } = useCurrency();
  const { user } = useUser();
  const [data, setData] = useState<ICartData | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const result = await getCartAction();
    if (result.ok) setData(result.data ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, currency, user?.id]);

  const applyResult = useCallback(
    async (
      result: IActionResult<ICartData>,
    ): Promise<IActionResult<ICartData>> => {
      if (result.ok) {
        if (result.data?.items && result.data?.products) {
          setData(result.data);
        } else {
          await refresh();
        }
      }
      return result;
    },
    [refresh],
  );

  const add = useCallback(
    async (productId: number, skuId: number, count: number) =>
      applyResult(await addToCartAction({ productId, skuId, count })),
    [applyResult],
  );

  const update = useCallback(
    async (productId: number, skuId: number, count: number) =>
      applyResult(await updateCartItemAction({ productId, skuId, count })),
    [applyResult],
  );

  const remove = useCallback(
    async (productId: number) =>
      applyResult(await removeCartItemAction(productId)),
    [applyResult],
  );

  const clear = useCallback(
    async () => applyResult(await clearCartAction()),
    [applyResult],
  );

  const items = useMemo(() => buildCartItemViews(data), [data]);
  const totals = useMemo(() => computeCartTotals(items), [items]);

  const value = useMemo<ICartContextValue>(
    () => ({
      data,
      items,
      totals,
      count: data?.count ?? 0,
      totalQuantity: data?.total_quantity ?? 0,
      loading,
      add,
      update,
      remove,
      clear,
      refresh,
    }),
    [data, items, totals, loading, add, update, remove, clear, refresh],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
