"use client";

import { useShopStories } from "@/features/home/hooks/use-shop-stories";
import { StoriesList } from "./stories-list";
import { StoriesSkeleton } from "./stories-skeleton";

export function Stories() {
  const { data: shops = [], isPending } = useShopStories();

  if (isPending) return <StoriesSkeleton />;

  const activeShops = shops.filter((shop) => shop.has_active_stories);

  if (activeShops.length === 0) return null;

  return <StoriesList shops={activeShops} />;
}
