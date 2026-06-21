"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StoryRing } from "@/features/home/components/stories/story-item/story-ring";
import { StoryViewer } from "@/features/home/components/stories/story-viewer/story-viewer";
import type { IShopStory } from "@/features/home/utils/shop-story.interface";
import type { IApiShop } from "@/features/shop/utils/shop-response.interface";

interface IProps {
  shop: IApiShop;
  activeCount: number;
  viewedCount: number;
  className?: string;
}

export function ShopLogoStory({ shop, activeCount, viewedCount, className }: IProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const hasStories = activeCount > 0;
  const safeTotal = Math.max(1, activeCount);

  const shopForViewer: IShopStory = {
    id: shop.id,
    username: shop.username,
    name: shop.display_name,
    display_name: shop.display_name,
    avatar_url: shop.logo_url,
    is_verified: shop.is_verified,
    active_stories_count: activeCount,
    viewed_stories_count: viewedCount,
    has_active_stories: hasStories,
    has_unviewed_stories: viewedCount < activeCount,
    all_stories_viewed: hasStories && viewedCount >= activeCount,
    story_ring_state: !hasStories
      ? "none"
      : viewedCount >= activeCount
        ? "viewed"
        : "unviewed",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => hasStories && setOpen(true)}
        className={cn(
          "relative size-32 shrink-0 bg-white rounded-full p-0.5",
          hasStories ? "cursor-pointer" : "cursor-default",
          className,
        )}
      >
        {hasStories && (
          <StoryRing
            total={safeTotal}
            viewedCount={viewedCount}
            strokeWidth={2}
          />
        )}
        <span
          className={cn(
            "absolute overflow-hidden rounded-full bg-background z-10",
            hasStories
              ? "inset-2 ring-2 ring-card"
              : "inset-0 border-6 border-card",
          )}
        >
          <Image
            src={shop.logo_url}
            alt={shop.display_name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </span>
      </button>

      {open && (
        <StoryViewer
          shops={[shopForViewer]}
          initialShopIndex={0}
          onClose={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
