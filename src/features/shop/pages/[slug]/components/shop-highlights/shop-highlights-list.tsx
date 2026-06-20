"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollEdges } from "@/features/home/hooks/use-scroll-edges";
import type { IApiShopHighlight } from "@/features/shop/utils/shop-highlight.interface";
import { ShopHighlightItem } from "./shop-highlight-item";
import { ShopHighlightViewer } from "./shop-highlight-viewer";

interface IProps {
  highlights: IApiShopHighlight[];
}

export function ShopHighlightsList({ highlights }: IProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, atStart, atEnd } = useScrollEdges<HTMLDivElement>();

  return (
    <div className="relative mb-3 md:mb-8 max-w-360 mx-auto pt-3 md:pt-0 w-full">
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto px-4 md:gap-6 md:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {highlights.map((highlight, i) => (
          <ShopHighlightItem
            key={highlight.id}
            highlight={highlight}
            onClick={() => setActiveIndex(i)}
          />
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
        <ShopHighlightViewer
          highlights={highlights}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
