"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AltArrowLeft, AltArrowRight } from "@solar-icons/react";
import type { IShopStory } from "@/features/home/utils/shop-story.interface";
import type { IStory } from "@/features/home/utils/story.interface";
import { ACTIVE_SLOT_WIDTH, EASING, SLOT_WIDTH, TRANSITION_MS } from "@/features/home/utils/brand-story.constants";
import { storyApi } from "@/features/home/api/story.api";
import { getClientSessionId } from "@/lib/session-id";
import { StoryCard } from "./story-card";

interface IProps {
  shops: IShopStory[];
  initialShopIndex: number;
  onClose: () => void;
}

function firstUnviewedIdx(stories: IStory[]): number {
  const idx = stories.findIndex((s) => !s.is_viewed);
  return idx === -1 ? 0 : idx;
}

export function StoryViewer({ shops, initialShopIndex, onClose }: IProps) {
  const sessionId = useMemo(() => getClientSessionId(), []);

  const [shopIndex, setShopIndex] = useState(initialShopIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyCache, setStoryCache] = useState<Record<number, IStory[]>>({});
  const [loadingShopIds, setLoadingShopIds] = useState<Set<number>>(new Set());
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const currentShop = shops[shopIndex];
  const currentStories = storyCache[currentShop?.id] ?? [];
  const isLoading = !!currentShop && loadingShopIds.has(currentShop.id);
  const currentStory = currentStories[storyIndex];
  const isVideo = currentStory?.media_type === "video";

  const storyCacheRef = useRef(storyCache);
  storyCacheRef.current = storyCache;
  const loadingRef = useRef(loadingShopIds);
  loadingRef.current = loadingShopIds;

  const storyStartTimeRef = useRef<number>(0);
  const totalPausedRef = useRef<number>(0);
  const pauseStartRef = useRef<number | null>(null);
  const viewedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const shopId = currentShop?.id;
    if (!shopId) return;
    if (storyCacheRef.current[shopId] !== undefined) return;
    if (loadingRef.current.has(shopId)) return;

    setLoadingShopIds((prev) => new Set(prev).add(shopId));
    storyApi
      .getByShop(shopId, sessionId)
      .then((res) => {
        const stories = res.data?.stories ?? [];
        setStoryCache((prev) => ({ ...prev, [shopId]: stories }));
        setStoryIndex(firstUnviewedIdx(stories));
      })
      .catch(() => setStoryCache((prev) => ({ ...prev, [shopId]: [] })))
      .finally(() =>
        setLoadingShopIds((prev) => {
          const next = new Set(prev);
          next.delete(shopId);
          return next;
        }),
      );
  }, [shopIndex, sessionId]);

  useEffect(() => {
    if (isLoading) return;
    storyStartTimeRef.current = Date.now();
    totalPausedRef.current = 0;
    pauseStartRef.current = null;
  }, [storyIndex, shopIndex, isLoading]);

  useEffect(() => {
    if (isPaused) {
      pauseStartRef.current = Date.now();
    } else if (pauseStartRef.current !== null) {
      totalPausedRef.current += Date.now() - pauseStartRef.current;
      pauseStartRef.current = null;
    }
  }, [isPaused]);

  useEffect(() => {
    const shopId = currentShop?.id;
    const story = (storyCacheRef.current[shopId] ?? [])[storyIndex];
    if (!story || !shopId) return;
    const key = `${shopId}-${story.id}`;
    if (viewedRef.current.has(key)) return;
    viewedRef.current.add(key);
    storyApi.markViewed(shopId, story.id, sessionId).catch(() => {});
  }, [shopIndex, storyIndex, storyCache, sessionId]);

  const advanceFn = useCallback(() => {
    const shopId = currentShop?.id;
    const stories = storyCacheRef.current[shopId] ?? [];
    setIsPaused(false);
    if (storyIndex < stories.length - 1) {
      setStoryIndex((s) => s + 1);
    } else if (shopIndex < shops.length - 1) {
      const nextShopId = shops[shopIndex + 1]?.id;
      const nextStories = storyCacheRef.current[nextShopId] ?? [];
      setShopIndex((s) => s + 1);
      setStoryIndex(firstUnviewedIdx(nextStories));
    } else {
      onClose();
    }
  }, [shopIndex, storyIndex, shops, onClose, currentShop]);

  const goBackFn = useCallback(() => {
    setIsPaused(false);
    if (storyIndex > 0) {
      setStoryIndex((s) => s - 1);
    } else if (shopIndex > 0) {
      const prevShopId = shops[shopIndex - 1]?.id;
      const prevStories = storyCacheRef.current[prevShopId] ?? [];
      setShopIndex((s) => s - 1);
      setStoryIndex(Math.max(0, prevStories.length - 1));
    }
  }, [shopIndex, storyIndex, shops]);

  const advanceRef = useRef(advanceFn);
  advanceRef.current = advanceFn;

  useEffect(() => {
    if (isPaused || isLoading || !currentStory) return;
    const elapsed = Date.now() - storyStartTimeRef.current - totalPausedRef.current;
    const remaining = Math.max(500, currentStory.duration * 1000 - elapsed);
    const t = setTimeout(() => advanceRef.current(), remaining);
    return () => clearTimeout(t);
  }, [storyIndex, shopIndex, isPaused, isLoading, currentStory?.id]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && shopIndex > 0) {
        const prevShopId = shops[shopIndex - 1]?.id;
        setShopIndex((s) => s - 1);
        setStoryIndex(firstUnviewedIdx(storyCacheRef.current[prevShopId] ?? []));
      }
      if (e.key === "ArrowRight" && shopIndex < shops.length - 1) {
        const nextShopId = shops[shopIndex + 1]?.id;
        setShopIndex((s) => s + 1);
        setStoryIndex(firstUnviewedIdx(storyCacheRef.current[nextShopId] ?? []));
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, shopIndex, shops.length]);

  const isFirst = shopIndex === 0;
  const isLast = shopIndex === shops.length - 1;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative h-dvh w-full overflow-hidden sm:h-175">
        <div
          className="absolute left-1/2 top-1/2 flex items-center will-change-transform"
          style={{
            transform: `translate3d(${-shopIndex * SLOT_WIDTH - ACTIVE_SLOT_WIDTH / 2}px, -50%, 0)`,
            transition: `transform ${TRANSITION_MS}ms ${EASING}`,
          }}
        >
          {shops.map((shop, i) => (
            <div
              key={shop.id}
              className="flex shrink-0 items-center justify-center"
              style={{
                width: i === shopIndex ? ACTIVE_SLOT_WIDTH : SLOT_WIDTH,
                transition: `width ${TRANSITION_MS}ms ${EASING}`,
              }}
            >
              <StoryCard
                shop={shop}
                stories={storyCache[shop.id] ?? []}
                isLoading={loadingShopIds.has(shop.id)}
                isActive={i === shopIndex}
                distance={i - shopIndex}
                storyIndex={i === shopIndex ? storyIndex : 0}
                isPaused={isPaused}
                isMuted={isMuted}
                onAdvance={advanceFn}
                onGoBack={goBackFn}
                onSelect={() => {
                  const shopId = shops[i]?.id;
                  setShopIndex(i);
                  setStoryIndex(firstUnviewedIdx(storyCacheRef.current[shopId] ?? []));
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
          const prevShopId = shops[shopIndex - 1]?.id;
          setShopIndex((s) => s - 1);
          setStoryIndex(firstUnviewedIdx(storyCacheRef.current[prevShopId] ?? []));
        }}
        disabled={isFirst}
        aria-label="Previous shop"
        className="absolute left-[calc(50%-225px)] top-1/2 z-40 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white text-foreground shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AltArrowLeft className="size-5" weight="Outline" />
      </button>

      <button
        type="button"
        onClick={() => {
          const nextShopId = shops[shopIndex + 1]?.id;
          setShopIndex((s) => s + 1);
          setStoryIndex(firstUnviewedIdx(storyCacheRef.current[nextShopId] ?? []));
        }}
        disabled={isLast}
        aria-label="Next shop"
        className="absolute right-[calc(50%-225px)] top-1/2 z-40 grid size-11 -translate-y-1/2 translate-x-1/2 cursor-pointer place-items-center rounded-full bg-white text-foreground shadow-md transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AltArrowRight className="size-5" weight="Outline" />
      </button>
    </div>
  );
}
