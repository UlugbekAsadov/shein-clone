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
  mergeServerCartProducts,
  removeCartProduct,
  setCartLineCount,
} from "@/features/cart/utils/cart.helpers";
import type {
  ICartContextValue,
  ICartData,
  ICartSkuInfo,
} from "@/features/cart/utils/cart.interface";

export const CartContext = createContext<ICartContextValue | undefined>(
  undefined,
);

const CART_STORAGE_KEY = "cart_data";

interface IProps {
  children: ReactNode;
}

const OK_RESULT: IActionResult<ICartData> = { ok: true };

export function CartProvider({ children }: IProps) {
  const { user } = useUser();
  const [data, setData] = useState<ICartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const dataRef = useRef<ICartData | null>(null);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    let initial: ICartData | null = null;
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) initial = JSON.parse(raw) as ICartData;
    } catch {
      initial = null;
    }
    setData(initial);
    setHydrated(true);
    setLoading(false);
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
    if (!result.ok || !result.data) return;
    const server = result.data;
    setData((current) => {
      if (!current || current.items.length === 0) {
        return server.items.length ? server : current;
      }
      return mergeServerCartProducts(current, server.products);
    });
  }, []);

  const refresh = useCallback(async () => {
    await syncFromServer();
  }, [syncFromServer]);

  useEffect(() => {
    if (!hydrated) return;
    void syncFromServer();
  }, [hydrated, user?.id, syncFromServer]);

  const persistInBackground = useCallback(
    (action: () => Promise<IActionResult<ICartData>>) => {
      void action().catch(() => undefined);
    },
    [],
  );

  const add = useCallback(
    async (
      product: IProduct,
      skuId: number,
      count: number,
      skuInfo?: ICartSkuInfo[],
    ) => {
      setData((current) =>
        addLineToCart(current, product, skuId, count, skuInfo),
      );
      persistInBackground(() =>
        addToCartAction({ productId: product.id, skuId, count }),
      );
      return OK_RESULT;
    },
    [persistInBackground],
  );

  const update = useCallback(
    async (productId: number, skuId: number, count: number) => {
      setData((current) => setCartLineCount(current, skuId, count));
      persistInBackground(() =>
        updateCartItemAction({ productId, skuId, count }),
      );
      return OK_RESULT;
    },
    [persistInBackground],
  );

  const remove = useCallback(
    async (productId: number) => {
      setData((current) => removeCartProduct(current, productId));
      persistInBackground(() => removeCartItemAction(productId));
      return OK_RESULT;
    },
    [persistInBackground],
  );

  const clear = useCallback(async () => {
    setData(createEmptyCart());
    persistInBackground(() => clearCartAction());
    return OK_RESULT;
  }, [persistInBackground]);

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
