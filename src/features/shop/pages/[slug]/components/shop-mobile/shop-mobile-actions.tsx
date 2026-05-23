"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  initialFollowing?: boolean;
  followLabel: string;
  followingLabel: string;
  messageLabel: string;
}

export function ShopMobileActions({
  initialFollowing = false,
  followLabel,
  followingLabel,
  messageLabel,
}: IProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  if (!isFollowing) {
    return (
      <div className="px-4">
        <Button
          type="button"
          size="lg"
          onClick={() => setIsFollowing(true)}
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
        onClick={() => setIsFollowing(false)}
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
