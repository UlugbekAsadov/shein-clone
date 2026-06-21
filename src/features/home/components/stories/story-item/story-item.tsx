"use client";

import Image from "next/image";
import type { IShopStory } from "@/features/home/utils/shop-story.interface";
import { StoryRing } from "./story-ring";
import { cn } from "@/lib/utils";

interface IProps {
  shop: IShopStory;
  onClick: () => void;
  nameClassName?: string;
}

export function StoryItem({ shop, onClick, nameClassName }: IProps) {
  const isFullyViewed = shop.story_ring_state !== "unviewed";
  const safeTotal = Math.max(1, shop.active_stories_count);
  const viewedCount = isFullyViewed ? safeTotal : shop.viewed_stories_count;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex shrink-0 cursor-pointer flex-col items-center gap-1",
        "md:gap-2",
      )}
    >
      <span className={cn("relative block size-15", "md:size-24")}>
        <StoryRing total={safeTotal} viewedCount={viewedCount} />
        <span
          className={cn(
            "absolute inset-1 overflow-hidden rounded-full ring-2 ring-background",
            "md:inset-2",
          )}
        >
          <Image
            src={shop.avatar_url}
            alt={shop.display_name}
            fill
            quality={95}
            sizes="80px"
            className="object-cover"
          />
        </span>
      </span>
      <span
        className={cn(
          "text-xs font-medium text-foreground",
          "md:text-sm md:font-semibold",
          nameClassName,
        )}
      >
        {shop.display_name}
      </span>
    </button>
  );
}
