"use client";

import { useEffect, useState } from "react";
import { getMinOrderAmountAction } from "@/features/cart/services/cart.actions";

export function useMinOrderAmount() {
  const [amount, setAmount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    void getMinOrderAmountAction().then((result) => {
      if (!active || !result.ok || !result.data) return;
      setAmount(result.data.amount);
    });
    return () => {
      active = false;
    };
  }, []);

  return amount;
}
