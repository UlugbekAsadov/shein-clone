"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleShopFollowAction } from "@/features/shop/services/shop-follow.actions";

export function useShopFollow(shopId: number, initialFollowing: boolean) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    if (isPending) return;
    const next = !isFollowing;
    setIsFollowing(next);
    startTransition(async () => {
      const result = await toggleShopFollowAction(shopId);
      if (!result.ok) {
        setIsFollowing(!next);
        return;
      }
      router.refresh();
    });
  }

  return { isFollowing, toggle, isPending };
}
