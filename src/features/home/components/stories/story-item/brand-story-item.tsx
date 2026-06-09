"use client";

import Image from "next/image";
import type { IBrand } from "@/types/brand.interface";
import { StoryRing } from "./story-ring";
import { cn } from "@/lib/utils";

interface IProps {
  brand: IBrand;
  onClick: () => void;
  brandClassName?: string;
}

export function BrandStoryItem({ brand, onClick, brandClassName }: IProps) {
  const total = brand.contents.length;
  const viewedCount = brand.viewedCount ?? 0;

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
        <StoryRing total={total} viewedCount={viewedCount} />
        <span
          className={cn(
            "absolute inset-1 overflow-hidden rounded-full ring-2 ring-background",
            "md:inset-2",
          )}
          style={{ backgroundColor: brand.brandBg ?? "#0f172a" }}
        >
          <Image
            src={brand.image}
            alt={brand.name}
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
          brandClassName,
        )}
      >
        {brand.name}
      </span>
    </button>
  );
}
