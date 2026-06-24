"use client";

import { Button } from "@/shared/components/ui/button";
import { useShopFollow } from "@/features/shop/hooks/use-shop-follow";

interface IProps {
  shopId: number;
  initialFollowing: boolean;
  followLabel: string;
  followingLabel: string;
}

export function FeaturedShopGridFollowButton({
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
    <Button
      variant={isFollowing ? "outline" : "default"}
      onClick={toggle}
      disabled={isPending}
      className="h-8 px-5 text-xs font-bold rounded-[10px]"
    >
      {isFollowing ? followingLabel : followLabel}
    </Button>
  );
}
