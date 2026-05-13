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

export function BrandStoryButton({ brand, onClick, brandClassName }: IProps) {
  const total = brand.contents.length;
  const viewedCount = brand.viewedCount ?? 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex shrink-0 cursor-pointer flex-col items-center gap-2"
    >
      <span className="relative block size-16 md:size-24">
        <StoryRing total={total} viewedCount={viewedCount} />
        <span
          className="absolute inset-1.5 overflow-hidden rounded-full ring-2 ring-background md:inset-2"
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
        className={cn("text-xs font-medium text-foreground", brandClassName)}
      >
        {brand.name}
      </span>
    </button>
  );
}
