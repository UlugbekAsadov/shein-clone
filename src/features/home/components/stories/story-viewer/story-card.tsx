"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { IShop } from "@/features/home/utils/shop-story.interface";
import type { IStory, IStoryText } from "@/features/home/utils/story.interface";
import { Pause, Play, VolumeCross, VolumeLoud } from "@solar-icons/react";
import { XIcon } from "@/shared/components/icons/outline";
import { cn } from "@/lib/utils";
import { EASING, TRANSITION_MS } from "@/features/home/utils/brand-story.constants";
import { StoryMedia } from "./story-media";
import { ProgressBar } from "./progress-bar";

interface IProps {
  shop: IShop;
  stories: IStory[];
  isLoading: boolean;
  isActive: boolean;
  distance: number;
  storyIndex: number;
  isPaused: boolean;
  isMuted: boolean;
  onAdvance: () => void;
  onGoBack: () => void;
  onSelect: () => void;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onClose: () => void;
}

export function StoryCard({
  shop,
  stories,
  isLoading,
  isActive,
  distance,
  storyIndex,
  isPaused,
  isMuted,
  onAdvance,
  onGoBack,
  onSelect,
  onTogglePause,
  onToggleMute,
  onClose,
}: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const absDist = Math.abs(distance);
  const story = stories[storyIndex];
  const shopHref = `/${lang}/demo/shop/${shop.id}`;

  function t(obj: IStoryText | null): string {
    if (!obj) return "";
    return obj[lang as keyof IStoryText] ?? obj.uz ?? "";
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-900 shadow-2xl sm:rounded-[20px]",
        isActive
          ? "h-dvh w-screen opacity-100 sm:h-160 sm:w-90"
          : absDist === 1
            ? "h-0 w-0 opacity-0 sm:h-135 sm:w-80 sm:opacity-60"
            : absDist === 2
              ? "h-0 w-0 opacity-0 sm:h-110 sm:w-65 sm:opacity-40"
              : "h-0 w-0 opacity-0",
      )}
      style={{
        transition: `width ${TRANSITION_MS}ms ${EASING}, height ${TRANSITION_MS}ms ${EASING}, opacity ${TRANSITION_MS}ms ${EASING}`,
      }}
    >
      {isActive && story && (
        <StoryMedia
          story={story}
          isActive={isActive}
          isMuted={isMuted}
          isPaused={isPaused}
        />
      )}

      {isActive && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-black/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-52 bg-gradient-to-t from-black/80 to-transparent" />

      <button
        type="button"
        onClick={isActive ? onGoBack : onSelect}
        aria-label="Previous story"
        className="absolute left-0 top-0 z-20 h-full w-[10%] cursor-pointer"
      />
      <button
        type="button"
        onClick={isActive ? onAdvance : onSelect}
        aria-label="Next story"
        className="absolute right-0 top-0 z-20 h-full w-[90%] cursor-pointer"
      />

      <div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-2"
        style={{
          opacity: isActive ? 0 : 1,
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <span className="relative block size-15">
          <span className="absolute inset-1 overflow-hidden rounded-full ring-2 ring-white/20">
            <Image src={shop.avatar_url} alt={shop.display_name} fill sizes="52px" className="object-cover" />
          </span>
        </span>
        <span className="text-sm font-semibold text-white drop-shadow-md">{shop.display_name}</span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
          opacity: isActive ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ${EASING}`,
        }}
      >
        <div className="absolute inset-x-3 top-3 flex gap-1">
          {stories.map((s, i) => (
            <ProgressBar
              key={`${shop.id}-${i}`}
              active={isActive}
              status={i < storyIndex ? "done" : i === storyIndex ? "active" : "pending"}
              resetKey={`${shop.id}-${storyIndex}`}
              durationMs={s.duration * 1000}
              isPaused={isPaused}
            />
          ))}
        </div>

        <div className="absolute inset-x-3 top-8 flex items-center justify-between gap-2">
          <Link
            href={shopHref}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto flex min-w-0 items-center gap-2"
          >
            <div className="size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
              <Image src={shop.avatar_url} alt={shop.display_name} width={36} height={36} quality={90} className="size-full object-cover" />
            </div>
            <span className="truncate text-sm font-semibold text-white drop-shadow">{shop.display_name}</span>
          </Link>

          <div className="pointer-events-auto flex shrink-0 items-center">
            {story?.media_type === "video" && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="grid size-9 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10"
                >
                  {isMuted ? <VolumeCross className="size-4" weight="Outline" /> : <VolumeLoud className="size-4" weight="Outline" />}
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onTogglePause(); }}
                  aria-label={isPaused ? "Play" : "Pause"}
                  className="grid size-9 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10"
                >
                  {isPaused ? <Play className="size-4" weight="Outline" /> : <Pause className="size-4" weight="Outline" />}
                </button>
              </>
            )}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close"
              className="grid size-9 cursor-pointer place-items-center rounded-full text-white hover:bg-white/10"
            >
              <XIcon className="size-5" />
            </button>
          </div>
        </div>

        {story && (t(story.headline_text) || t(story.tagline_text)) && (
          <div className="absolute inset-x-4 bottom-24 flex flex-col gap-0.5">
            {t(story.headline_text) && (
              <p className="text-base font-bold leading-tight text-white drop-shadow">{t(story.headline_text)}</p>
            )}
            {t(story.tagline_text) && (
              <p className="text-sm leading-snug text-white/80 drop-shadow">{t(story.tagline_text)}</p>
            )}
          </div>
        )}

        {story?.call_action && story.action_url && (
          <div className="pointer-events-auto absolute inset-x-4 bottom-5">
            <a
              href={story.action_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                color: story.call_action_button_style?.color ?? "#ffffff",
                backgroundColor: story.call_action_button_style?.background ?? "#1a1a1a",
              }}
              className="block w-full rounded-xl py-3.5 text-center text-sm font-semibold"
            >
              {t(story.call_button)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
