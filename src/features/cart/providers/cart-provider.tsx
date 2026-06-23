"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { IProduct } from "@/types/product.interface";
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
  addLineToCart,
  buildCartItemViews,
  computeCartTotals,
  createEmptyCart,
  removeCartProduct,
  setCartLineCount,
} from "@/features/cart/utils/cart.helpers";
import type {
  ICartContextValue,
  ICartData,
} from "@/features/cart/utils/cart.interface";

export const CartContext = createContext<ICartContextValue | undefined>(
  undefined,
);

const CART_STORAGE_KEY = "cart_data";

interface IProps {
  children: ReactNode;
}

export function CartProvider({ children }: IProps) {
  const { currency } = useCurrency();
  const { user } = useUser();
  const [data, setData] = useState<ICartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const dataRef = useRef<ICartData | null>(null);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as ICartData);
    } catch {
      setData(null);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (data) localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
      else localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      return;
    }
  }, [data, hydrated]);

  const syncFromServer = useCallback(async () => {
    const result = await getCartAction();
    if (result.ok) setData(result.data ?? null);
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    await syncFromServer();
    setLoading(false);
  }, [syncFromServer]);

  useEffect(() => {
    void refresh();
  }, [refresh, currency, user?.id]);

  const reconcile = useCallback(
    async (
      result: IActionResult<ICartData>,
      previous: ICartData | null,
    ): Promise<IActionResult<ICartData>> => {
      if (!result.ok) {
        setData(previous);
        return result;
      }
      if (result.data?.items && result.data?.products) {
        setData(result.data);
      } else {
        await syncFromServer();
      }
      return result;
    },
    [syncFromServer],
  );

  const add = useCallback(
    async (product: IProduct, skuId: number, count: number) => {
      const previous = dataRef.current;
      setData((current) => addLineToCart(current, product, skuId, count));
      const result = await addToCartAction({
        productId: product.id,
        skuId,
        count,
      });
      return reconcile(result, previous);
    },
    [reconcile],
  );

  const update = useCallback(
    async (productId: number, skuId: number, count: number) => {
      const previous = dataRef.current;
      setData((current) => setCartLineCount(current, skuId, count));
      const result = await updateCartItemAction({ productId, skuId, count });
      return reconcile(result, previous);
    },
    [reconcile],
  );

  const remove = useCallback(
    async (productId: number) => {
      const previous = dataRef.current;
      setData((current) => removeCartProduct(current, productId));
      const result = await removeCartItemAction(productId);
      return reconcile(result, previous);
    },
    [reconcile],
  );

  const clear = useCallback(async () => {
    const previous = dataRef.current;
    setData(createEmptyCart());
    const result = await clearCartAction();
    return reconcile(result, previous);
  }, [reconcile]);

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
