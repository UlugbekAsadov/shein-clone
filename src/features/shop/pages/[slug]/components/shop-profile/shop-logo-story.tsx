"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { StoryRing } from "@/features/home/components/stories/story-item/story-ring";
import { StoryViewer } from "@/features/home/components/stories/story-viewer/story-viewer";
import type { IShop } from "@/features/home/utils/shop-story.interface";
import type { IShopDetail } from "@/features/shop/pages/[slug]/utils/shop-detail.interface";

interface IProps {
  shop: IShopDetail;
  shopId: number;
  activeCount: number;
  viewedCount: number;
}

export function ShopLogoStory({
  shop,
  shopId,
  activeCount,
  viewedCount,
}: IProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const hasStories = activeCount > 0;
  const safeTotal = Math.max(1, activeCount);

  const shopForViewer: IShop = {
    id: shopId,
    username: String(shopId),
    name: shop.name,
    display_name: shop.name,
    avatar_url: shop.avatar,
    is_verified: shop.verified ?? false,
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
          "relative size-32 shrink-0 bg-white rounded-full p-1",
          hasStories ? "cursor-pointer" : "cursor-default",
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
              ? "inset-3 ring-2 ring-card"
              : "inset-0 border-6 border-card",
          )}
        >
          <Image
            src={shop.avatar}
            alt={shop.name}
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
