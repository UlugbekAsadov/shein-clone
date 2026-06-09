"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { brands } from "@/shared/mocks";
import { useScrollEdges } from "@/features/home/hooks/use-scroll-edges";
import type { IShop } from "@/features/home/utils/shop-story.interface";
import { StoryViewer } from "./story-viewer/story-viewer";
import { StoryItem } from "./story-item/story-item";

interface IProps {
  shops: IShop[];
}

export function StoriesList({ shops }: IProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, atStart, atEnd } = useScrollEdges<HTMLDivElement>();

  return (
    <div className="relative mx-auto mb-3 md:mb-8 max-w-360 pt-3 md:pt-0">
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto px-4 md:gap-6 md:px-6 scrollbar-thin [&::-webkit-scrollbar]:hidden scrollbar-hidden"
      >
        {shops.map((shop, i) => (
          <StoryItem key={shop.id} shop={shop} onClick={() => setActiveIndex(i)} />
        ))}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent transition-opacity duration-200",
          atStart && "opacity-0",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent transition-opacity duration-200",
          atEnd && "opacity-0",
        )}
      />

      {activeIndex !== null && (
        <StoryViewer
          brands={brands}
          initialIndex={activeIndex % brands.length}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
