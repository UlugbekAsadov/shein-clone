"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { StoryRing } from "@/features/home/components/stories/story-item/story-ring";
import type { IApiShopHighlight } from "@/features/shop/utils/shop-highlight.interface";

interface IProps {
  highlight: IApiShopHighlight;
  onClick: () => void;
}

export function ShopHighlightItem({ highlight, onClick }: IProps) {
  const total = Math.max(1, highlight.stories.length);

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
        <StoryRing total={total} viewedCount={0} />
        <span
          className={cn(
            "absolute inset-1 overflow-hidden rounded-full ring-2 ring-background bg-muted",
            "md:inset-2",
          )}
        >
          {highlight.thumbnail_url ? (
            <Image
              src={highlight.thumbnail_url}
              alt={highlight.display_name}
              fill
              quality={95}
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-base font-bold text-muted-foreground">
              {highlight.display_name[0]}
            </span>
          )}
        </span>
      </span>
      <span
        className={cn(
          "max-w-[60px] truncate text-xs font-medium text-foreground",
          "md:max-w-24 md:text-sm md:font-semibold",
        )}
      >
        {highlight.display_name}
      </span>
    </button>
  );
}
