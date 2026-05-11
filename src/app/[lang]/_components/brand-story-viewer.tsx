"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Brand } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STRIP_DURATION_MS = 10_000;
const TRANSITION_MS = 500;
const SLOT_WIDTH = 380;
const EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

type Props = {
  brands: Brand[];
  initialIndex: number;
  onClose: () => void;
};

export function BrandStoryViewer({ brands, initialIndex, onClose }: Props) {
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

      <div className="relative h-[700px] w-full overflow-hidden">
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

type StoryCardProps = {
  brand: Brand;
  isActive: boolean;
  distance: number;
  stripIndex: number;
  onAdvance: () => void;
  onSelect: () => void;
};

function StoryCard({
  brand,
  isActive,
  distance,
  stripIndex,
  onAdvance,
  onSelect,
}: StoryCardProps) {
  const absDist = Math.abs(distance);
  const renderable = absDist <= 2;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-muted shadow-2xl",
        isActive
          ? "h-[640px] w-[360px] opacity-100"
          : absDist === 1
            ? "h-[540px] w-[300px] opacity-60"
            : absDist === 2
              ? "h-[440px] w-[240px] opacity-30"
              : "h-[440px] w-[240px] opacity-0",
      )}
      style={{
        transition: `width ${TRANSITION_MS}ms ${EASING}, height ${TRANSITION_MS}ms ${EASING}, opacity ${TRANSITION_MS}ms ${EASING}`,
      }}
    >
      {renderable &&
        brand.contents.map((strip, i) => {
          const visible = isActive ? i === stripIndex : i === 0;
          return (
            <div
              key={`${brand.id}-${i}`}
              className="absolute inset-0"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
              }}
            >
              <Image
                src={strip}
                alt=""
                fill
                quality={isActive ? 95 : 80}
                sizes={isActive ? "360px" : "300px"}
                className="object-cover"
                priority={isActive && i === stripIndex}
              />
            </div>
          );
        })}

      <button
        type="button"
        onClick={isActive ? onAdvance : onSelect}
        aria-label={isActive ? "Next strip" : `Open ${brand.name}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity: isActive ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <div className="absolute inset-x-3 top-3 flex gap-1">
          {brand.contents.map((_, i) => (
            <ProgressBar
              key={`${brand.id}-${i}`}
              active={isActive}
              status={
                i < stripIndex ? "done" : i === stripIndex ? "active" : "pending"
              }
              resetKey={`${brand.id}-${stripIndex}`}
            />
          ))}
        </div>

        <div className="absolute left-3 top-7 flex items-center gap-2">
          <div
            className="size-9 overflow-hidden rounded-full ring-2 ring-white"
            style={{ backgroundColor: brand.brandBg }}
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={36}
              height={36}
              quality={95}
              className="size-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-white drop-shadow">
            {brand.name}
          </span>
        </div>
      </div>

      <div
        className="absolute inset-x-4 bottom-4 z-30"
        style={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="w-full cursor-pointer rounded-xl bg-foreground py-3.5 text-base font-semibold text-background transition hover:bg-foreground/90"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}

type ProgressBarProps = {
  status: "done" | "active" | "pending";
  active: boolean;
  resetKey: string;
};

function ProgressBar({ status, active, resetKey }: ProgressBarProps) {
  const [filled, setFilled] = useState(status === "done");

  useEffect(() => {
    if (!active) {
      setFilled(false);
      return;
    }
    if (status === "active") {
      setFilled(false);
      const id = requestAnimationFrame(() => setFilled(true));
      return () => cancelAnimationFrame(id);
    }
    setFilled(status === "done");
  }, [status, active, resetKey]);

  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
      <div
        className="h-full origin-left bg-white"
        style={{
          transform: `scaleX(${filled ? 1 : 0})`,
          transition:
            status === "active" && active
              ? `transform ${STRIP_DURATION_MS}ms linear`
              : "none",
        }}
      />
    </div>
  );
}
