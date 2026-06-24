"use client";

import { Button } from "@/shared/components/ui/button";
import { useShopFollow } from "@/features/shop/hooks/use-shop-follow";

interface IProps {
  shopId: number;
  initialFollowing?: boolean;
  followLabel: string;
  followingLabel: string;
  messageLabel: string;
}

export function ShopMobileActions({
  shopId,
  initialFollowing = false,
  followLabel,
  followingLabel,
  messageLabel,
}: IProps) {
  const { isFollowing, toggle, isPending } = useShopFollow(
    shopId,
    initialFollowing,
  );

  if (!isFollowing) {
    return (
      <div className="px-4">
        <Button
          type="button"
          size="lg"
          onClick={toggle}
          disabled={isPending}
          className="h-8.5 w-full rounded-[8px] text-sm font-bold"
        >
          {followLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-4">
      <Button
        type="button"
        size="lg"
        onClick={toggle}
        disabled={isPending}
        className="h-11 flex-1 rounded-[12px] text-sm font-bold"
      >
        {followingLabel}
      </Button>
      <Button
        type="button"
        size="lg"
        variant="secondary"
        className="h-11 flex-1 rounded-[12px] text-sm font-bold"
      >
        {messageLabel}
      </Button>
    </div>
  );
}
