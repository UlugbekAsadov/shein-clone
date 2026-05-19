"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  STORY_RING_ACTIVE_FROM,
  STORY_RING_ACTIVE_TO,
  STORY_RING_GAP_DEG,
  STORY_RING_STROKE,
  STORY_RING_VIEWBOX,
  STORY_RING_VIEWED_COLOR,
} from "@/features/home/constants/story-ring.constants";

interface IProps {
  total: number;
  viewedCount: number;
  className?: string;
}

const CENTER = STORY_RING_VIEWBOX / 2;
const RADIUS = CENTER - STORY_RING_STROKE / 2;

const round = (n: number) => Math.round(n * 1000) / 1000;

function polarToCartesian(angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: round(CENTER + RADIUS * Math.cos(a)),
    y: round(CENTER + RADIUS * Math.sin(a)),
  };
}

function arcPath(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

export function StoryRing({ total, viewedCount, className }: IProps) {
  const gradientId = useId();
  const safeTotal = Math.max(1, total);
  const allViewed = viewedCount >= safeTotal;
  const activeStroke = `url(#${gradientId})`;

  return (
    <svg
      viewBox={`0 0 ${STORY_RING_VIEWBOX} ${STORY_RING_VIEWBOX}`}
      className={cn("size-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={STORY_RING_ACTIVE_FROM} />
          <stop offset="100%" stopColor={STORY_RING_ACTIVE_TO} />
        </linearGradient>
      </defs>

      {safeTotal === 1 ? (
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={allViewed ? STORY_RING_VIEWED_COLOR : activeStroke}
          strokeWidth={STORY_RING_STROKE}
        />
      ) : (
        Array.from({ length: safeTotal }, (_, i) => {
          const start = i * (360 / safeTotal) + STORY_RING_GAP_DEG / 2;
          const end = (i + 1) * (360 / safeTotal) - STORY_RING_GAP_DEG / 2;
          const viewed = i < viewedCount;
          return (
            <path
              key={i}
              d={arcPath(start, end)}
              fill="none"
              stroke={viewed ? STORY_RING_VIEWED_COLOR : activeStroke}
              strokeWidth={STORY_RING_STROKE}
              strokeLinecap="round"
            />
          );
        })
      )}
    </svg>
  );
}
