"use client";

import { useState } from "react";
import { brands } from "@/shared/mocks";
import { StoryItem } from "@/features/home/components/stories/story-item/story-item";
import { StoryViewer } from "@/features/home/components/stories/story-viewer/story-viewer";

interface IProps {
  excludeSlug?: string;
}

export function ShopMobileBrands({ excludeSlug }: IProps) {
  const items = excludeSlug
    ? brands.filter((b) => b.slug !== excludeSlug)
    : brands;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-start gap-4">
        {items.map((brand, i) => (
          <StoryItem
            key={brand.id}
            brand={brand}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <StoryViewer
          brands={items}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
