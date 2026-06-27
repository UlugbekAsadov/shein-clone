"use client";

import { useShopHighlights } from "@/features/shop/hooks/use-shop-highlights";
import { ShopHighlightsList } from "./shop-highlights-list";
import { ShopHighlightsSkeleton } from "./shop-highlights-skeleton";

interface IProps {
  shopId: number;
}

export function ShopHighlights({ shopId }: IProps) {
  const { data: highlights = [], isPending } = useShopHighlights(shopId);

  if (isPending) return <ShopHighlightsSkeleton />;

  const active = highlights.filter((h) => h.is_active);

  if (active.length === 0) return null;

  return <ShopHighlightsList highlights={active} />;
}
