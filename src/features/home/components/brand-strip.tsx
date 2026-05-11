"use client";

import Image from "next/image";
import { useState } from "react";
import { brands } from "@/shared/mocks";
import { cn } from "@/lib/utils";
import { BrandStoryViewer } from "./brand-story-viewer/brand-story-viewer";

export function BrandStrip() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-[1440px] px-6">
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin">
        {brands.map((b, i) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group flex shrink-0 cursor-pointer flex-col items-center gap-2"
          >
            <span
              className={cn(
                "grid size-20 place-items-center rounded-full p-[5px]",
                b.storyViewed
                  ? "bg-muted-foreground/30"
                  : "bg-[conic-gradient(from_180deg_at_50%_50%,#fbbf24,#ec4899,#a855f7,#fbbf24)]",
              )}
            >
              <span
                className="relative size-full overflow-hidden rounded-full ring-2 ring-background"
                style={{ backgroundColor: b.brandBg ?? "#0f172a" }}
              >
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  quality={95}
                  sizes="80px"
                  className="rounded-full object-cover"
                />
              </span>
            </span>
            <span className="text-xs font-medium text-foreground">
              {b.name}
            </span>
          </button>
        ))}
      </div>

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
