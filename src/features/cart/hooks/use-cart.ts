"use client";

import { useContext } from "react";
import { CartContext } from "@/features/cart/providers/cart-provider";
import type { ICartContextValue } from "@/features/cart/utils/cart.interface";

export function useCart(): ICartContextValue {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
