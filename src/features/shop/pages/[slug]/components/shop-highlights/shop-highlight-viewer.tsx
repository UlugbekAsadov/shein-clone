"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AltArrowLeft, AltArrowRight } from "@solar-icons/react";
import type { IApiShopHighlight } from "@/features/shop/utils/shop-highlight.interface";
import type { IStory } from "@/features/home/utils/story.interface";
import type { IShop } from "@/features/home/utils/shop-story.interface";
import { ACTIVE_SLOT_WIDTH, EASING, SLOT_WIDTH, TRANSITION_MS } from "@/features/home/utils/brand-story.constants";
import { storyApi } from "@/features/home/api/story.api";
import { getClientSessionId } from "@/lib/session-id";
import { StoryCard } from "@/features/home/components/stories/story-viewer/story-card";

interface IProps {
  highlights: IApiShopHighlight[];
  initialIndex: number;
  onClose: () => void;
}

function firstUnviewedIdx(stories: IStory[]): number {
  const idx = stories.findIndex((s) => !s.is_viewed);
  return idx === -1 ? 0 : idx;
}

function toShop(highlight: IApiShopHighlight): IShop {
  return {
    id: highlight.id,
    username: String(highlight.shop_id),
    name: highlight.display_name,
    display_name: highlight.display_name,
    avatar_url: highlight.thumbnail_url,
    is_verified: false,
    active_stories_count: highlight.stories.length,
    viewed_stories_count: 0,
    has_active_stories: highlight.stories.length > 0,
    has_unviewed_stories: highlight.stories.length > 0,
    all_stories_viewed: false,
    story_ring_state: "unviewed",
  };
}

export function ShopHighlightViewer({ highlights, initialIndex, onClose }: IProps) {
  const sessionId = useMemo(() => getClientSessionId(), []);
  const shops = useMemo(() => highlights.map(toShop), [highlights]);

  const [highlightIndex, setHighlightIndex] = useState(initialIndex);
  const [storyIndex, setStoryIndex] = useState(() =>
    firstUnviewedIdx(highlights[initialIndex]?.stories ?? []),
  );
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentHighlight = highlights[highlightIndex];
  const currentStory = currentHighlight?.stories[storyIndex];

  const storyStartTimeRef = useRef<number>(0);
  const totalPausedRef = useRef<number>(0);
  const pauseStartRef = useRef<number | null>(null);
  const viewedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    storyStartTimeRef.current = Date.now();
    totalPausedRef.current = 0;
    pauseStartRef.current = null;
  }, [storyIndex, highlightIndex]);

  useEffect(() => {
    if (isPaused) {
      pauseStartRef.current = Date.now();
    } else if (pauseStartRef.current !== null) {
      totalPausedRef.current += Date.now() - pauseStartRef.current;
      pauseStartRef.current = null;
    }
  }, [isPaused]);

  useEffect(() => {
    const highlight = highlights[highlightIndex];
    const story = highlight?.stories[storyIndex];
    if (!story || !highlight) return;
    const key = `${highlight.id}-${story.id}`;
    if (viewedRef.current.has(key)) return;
    viewedRef.current.add(key);
    storyApi.markViewed(highlight.shop_id, story.id, sessionId).catch(() => {});
  }, [highlightIndex, storyIndex, highlights, sessionId]);

  const advanceFn = useCallback(() => {
    setIsPaused(false);
    const stories = highlights[highlightIndex]?.stories ?? [];
    if (storyIndex < stories.length - 1) {
      setStoryIndex((s) => s + 1);
    } else if (highlightIndex < highlights.length - 1) {
      setHighlightIndex((s) => s + 1);
      setStoryIndex(firstUnviewedIdx(highlights[highlightIndex + 1]?.stories ?? []));
    } else {
      onClose();
    }
  }, [highlightIndex, storyIndex, highlights, onClose]);

  const goBackFn = useCallback(() => {
    setIsPaused(false);
    if (storyIndex > 0) {
      setStoryIndex((s) => s - 1);
    } else if (highlightIndex > 0) {
      const prevHighlight = highlights[highlightIndex - 1];
      setHighlightIndex((s) => s - 1);
      setStoryIndex(Math.max(0, (prevHighlight?.stories.length ?? 1) - 1));
    }
  }, [highlightIndex, storyIndex, highlights]);

  const advanceRef = useRef(advanceFn);
  advanceRef.current = advanceFn;

  useEffect(() => {
    if (isPaused || !currentStory) return;
    const elapsed = Date.now() - storyStartTimeRef.current - totalPausedRef.current;
    const remaining = Math.max(500, currentStory.duration * 1000 - elapsed);
    const t = setTimeout(() => advanceRef.current(), remaining);
    return () => clearTimeout(t);
  }, [storyIndex, highlightIndex, isPaused, currentStory?.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && highlightIndex > 0) {
        setHighlightIndex((s) => s - 1);
        setStoryIndex(0);
      }
      if (e.key === "ArrowRight" && highlightIndex < highlights.length - 1) {
        setHighlightIndex((s) => s + 1);
        setStoryIndex(0);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, highlightIndex, highlights.length]);

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative h-dvh w-full overflow-hidden sm:h-175">
        <div
          className="absolute left-1/2 top-1/2 flex items-center will-change-transform"
          style={{
            transform: `translate3d(${-highlightIndex * SLOT_WIDTH - ACTIVE_SLOT_WIDTH / 2}px, -50%, 0)`,
            transition: `transform ${TRANSITION_MS}ms ${EASING}`,
          }}
        >
          {shops.map((shop, i) => (
            <div
              key={shop.id}
              className="flex shrink-0 items-center justify-center"
              style={{
                width: i === highlightIndex ? ACTIVE_SLOT_WIDTH : SLOT_WIDTH,
                transition: `width ${TRANSITION_MS}ms ${EASING}`,
              }}
            >
              <StoryCard
                shop={shop}
                stories={highlights[i]?.stories ?? []}
                isLoading={false}
                isActive={i === highlightIndex}
                distance={i - highlightIndex}
                storyIndex={i === highlightIndex ? storyIndex : 0}
                isPaused={isPaused}
                isMuted={isMuted}
                onAdvance={advanceFn}
                onGoBack={goBackFn}
                onSelect={() => {
                  setHighlightIndex(i);
                  setStoryIndex(firstUnviewedIdx(highlights[i]?.stories ?? []));
                }}
                onTogglePause={() => setIsPaused((p) => !p)}
                onToggleMute={() => setIsMuted((m) => !m)}
                onClose={onClose}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setHighlightIndex((s) => s - 1);
          setStoryIndex(0);
        }}
        disabled={highlightIndex === 0}
        aria-label="Previous highlight"
        className="absolute left-[calc(50%-225px)] top-1/2 z-40 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-foreground shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AltArrowLeft className="size-5" weight="Outline" />
      </button>

      <button
        type="button"
        onClick={() => {
          setHighlightIndex((s) => s + 1);
          setStoryIndex(0);
        }}
        disabled={highlightIndex === highlights.length - 1}
        aria-label="Next highlight"
        className="absolute right-[calc(50%-225px)] top-1/2 z-40 grid size-11 -translate-y-1/2 translate-x-1/2 cursor-pointer place-items-center rounded-full bg-white text-foreground shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AltArrowRight className="size-5" weight="Outline" />
      </button>
    </div>
  );
}
