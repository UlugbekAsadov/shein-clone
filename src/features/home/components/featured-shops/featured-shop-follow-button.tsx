"use client";

import { cn } from "@/lib/utils";
import { useShopFollow } from "@/features/shop/hooks/use-shop-follow";

interface IProps {
  shopId: number;
  initialFollowing: boolean;
  followLabel: string;
  followingLabel: string;
}

export function FeaturedShopFollowButton({
  shopId,
  initialFollowing,
  followLabel,
  followingLabel,
}: IProps) {
  const { isFollowing, toggle, isPending } = useShopFollow(
    shopId,
    initialFollowing,
  );

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className={cn(
        "mt-3 h-10 w-full cursor-pointer rounded-[10px] text-sm font-semibold transition disabled:opacity-60",
        isFollowing
          ? "border border-foreground bg-card text-foreground hover:bg-muted"
          : "bg-foreground text-background hover:bg-foreground/90",
      )}
    >
      {isFollowing ? followingLabel : followLabel}
    </button>
  );
}
