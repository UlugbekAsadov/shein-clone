"use client";

import { useState } from "react";
import { brands } from "@/shared/mocks";
import { BrandStoryButton } from "@/features/home/components/brand-strip/brand-story-button";
import { BrandStoryViewer } from "@/features/home/components/brand-story-viewer/brand-story-viewer";

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
          <BrandStoryButton
            key={brand.id}
            brand={brand}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <BrandStoryViewer
          brands={items}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
