"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { IBrand } from "@/types/brand.interface";
import { cn } from "@/lib/utils";
import {
  EASING,
  TRANSITION_MS,
} from "@/features/home/constants/brand-story.constants";
import { ProgressBar } from "./progress-bar";
import { StoryItem } from "../story-item/story-item";

interface IProps {
  brand: IBrand;
  isActive: boolean;
  distance: number;
  stripIndex: number;
  onAdvance: () => void;
  onSelect: () => void;
}

export function StoryCard({
  brand,
  isActive,
  distance,
  stripIndex,
  onAdvance,
  onSelect,
}: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const shopHref = `/${lang}/shop/${brand.slug}`;
  const absDist = Math.abs(distance);
  const renderable = absDist <= 2;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted shadow-2xl sm:rounded-[20px]",
        isActive
          ? "h-screen w-screen opacity-100 sm:h-160 sm:w-90"
          : absDist === 1
            ? "h-0 w-0 opacity-0 sm:h-135 sm:w-80 sm:opacity-60"
            : absDist === 2
              ? "h-0 w-0 opacity-0 sm:h-135 sm:w-80 sm:opacity-60"
              : "h-0 w-0 opacity-0 sm:h-110 sm:w-65",
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
                quality={isActive ? 95 : 90}
                sizes={isActive ? "360px" : "300px"}
                className="object-cover"
                priority={isActive && i === stripIndex}
              />
            </div>
          );
        })}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 bg-gradient-to-b from-black/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-black/70 to-transparent"
      />

      <button
        type="button"
        onClick={isActive ? onAdvance : onSelect}
        aria-label={isActive ? "Next strip" : `Open ${brand.name}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      <div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-2"
        style={{
          opacity: isActive ? 0 : 1,
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <StoryItem
          brand={brand}
          onClick={() => {}}
          brandClassName="text-sm font-semibold text-white drop-shadow-md"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity: isActive ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <div className="absolute inset-x-3 top-4 flex gap-1">
          {brand.contents.map((_, i) => (
            <ProgressBar
              key={`${brand.id}-${i}`}
              active={isActive}
              status={
                i < stripIndex
                  ? "done"
                  : i === stripIndex
                    ? "active"
                    : "pending"
              }
              resetKey={`${brand.id}-${stripIndex}`}
            />
          ))}
        </div>

        <Link
          href={shopHref}
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto absolute left-3 top-7 flex items-center gap-2"
        >
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
        </Link>
      </div>

      <div
        className="absolute inset-x-4 bottom-5 z-30"
        style={{
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? "auto" : "none",
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="w-full cursor-pointer rounded-[12px] bg-foreground py-3.5 text-sm font-semibold text-background transition hover:bg-foreground/90"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
