"use client";

import { useState } from "react";
import { brands } from "@/shared/mocks";
import { cn } from "@/lib/utils";
import { useScrollEdges } from "@/features/home/hooks/use-scroll-edges";
import { BrandStoryViewer } from "../brand-story-viewer/brand-story-viewer";
import { BrandStoryButton } from "./brand-story-button";

export function BrandStrip() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { ref, atStart, atEnd } = useScrollEdges<HTMLDivElement>();

  return (
    <div className="relative mx-auto mb-8 max-w-360 pt-3 md:pt-0">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto px-4 md:gap-6 md:px-6 scrollbar-thin [&::-webkit-scrollbar]:hidden scrollbar-hidden"
      >
        {brands.map((b, i) => (
          <BrandStoryButton
            key={b.id}
            brand={b}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent transition-opacity duration-200",
          atStart && "opacity-0",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent transition-opacity duration-200",
          atEnd && "opacity-0",
        )}
      />

      {activeIndex !== null && (
        <BrandStoryViewer
          brands={brands}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
