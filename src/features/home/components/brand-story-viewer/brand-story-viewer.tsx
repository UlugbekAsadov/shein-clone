"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { IBrand } from "@/types/brand.interface";
import {
  EASING,
  SLOT_WIDTH,
  STRIP_DURATION_MS,
  TRANSITION_MS,
} from "@/features/home/constants/brand-story.constants";
import { StoryCard } from "./story-card";

interface IProps {
  brands: IBrand[];
  initialIndex: number;
  onClose: () => void;
}

export function BrandStoryViewer({ brands, initialIndex, onClose }: IProps) {
  const [brandIndex, setBrandIndex] = useState(initialIndex);
  const [stripIndex, setStripIndex] = useState(0);

  const isFirst = brandIndex === 0;
  const isLast = brandIndex === brands.length - 1;

  useEffect(() => {
    setStripIndex(0);
  }, [brandIndex]);

  const advance = useCallback(() => {
    const maxStrip = (brands[brandIndex]?.contents.length ?? 1) - 1;
    if (stripIndex < maxStrip) {
      setStripIndex(stripIndex + 1);
    } else if (brandIndex < brands.length - 1) {
      setBrandIndex(brandIndex + 1);
    }
  }, [brandIndex, stripIndex, brands]);

  useEffect(() => {
    const t = setTimeout(advance, STRIP_DURATION_MS);
    return () => clearTimeout(t);
  }, [stripIndex, brandIndex, advance]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && !isFirst) setBrandIndex((b) => b - 1);
      if (e.key === "ArrowRight" && !isLast) setBrandIndex((b) => b + 1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, isFirst, isLast]);

  const goPrev = () => {
    if (!isFirst) setBrandIndex((b) => b - 1);
  };
  const goNext = () => {
    if (!isLast) setBrandIndex((b) => b + 1);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 z-40 grid size-10 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10"
      >
        <X className="size-6" />
      </button>

      <div className="relative h-175 w-full overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 flex items-center will-change-transform"
          style={{
            transform: `translate3d(${-brandIndex * SLOT_WIDTH - SLOT_WIDTH / 2}px, -50%, 0)`,
            transition: `transform ${TRANSITION_MS}ms ${EASING}`,
          }}
        >
          {brands.map((b, i) => (
            <div
              key={b.id}
              className="flex shrink-0 items-center justify-center"
              style={{ width: SLOT_WIDTH }}
            >
              <StoryCard
                brand={b}
                isActive={i === brandIndex}
                distance={i - brandIndex}
                stripIndex={i === brandIndex ? stripIndex : 0}
                onAdvance={advance}
                onSelect={() => setBrandIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        disabled={isFirst}
        aria-label="Previous brand"
        className="absolute left-[calc(50%-235px)] top-1/2 z-40 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-foreground shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={goNext}
        disabled={isLast}
        aria-label="Next brand"
        className="absolute right-[calc(50%-235px)] top-1/2 z-40 grid size-11 -translate-y-1/2 translate-x-1/2 cursor-pointer place-items-center rounded-full bg-white text-foreground shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}
