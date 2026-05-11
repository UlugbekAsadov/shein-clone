"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  initialFollowing?: boolean;
  followLabel: string;
  followingLabel: string;
}

export function ShopFollowButton({
  initialFollowing = false,
  followLabel,
  followingLabel,
}: IProps) {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);

  return (
    <button
      type="button"
      onClick={() => setIsFollowing((v) => !v)}
      className={cn(
        "shrink-0 cursor-pointer rounded-full px-8 py-2.5 text-sm font-semibold transition",
        isFollowing
          ? "border border-foreground bg-card text-foreground hover:bg-muted"
          : "bg-foreground text-background hover:bg-foreground/90",
      )}
    >
      {isFollowing ? followingLabel : followLabel}
    </button>
  );
}
