"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { IStory } from "@/features/home/utils/story.interface";

interface IProps {
  story: IStory;
  isActive: boolean;
  isMuted: boolean;
  isPaused: boolean;
}

export function StoryMedia({ story, isActive, isMuted, isPaused }: IProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!isActive || isPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [isActive, isPaused]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);

  if (story.media_type === "video") {
    return (
      <video
        ref={videoRef}
        key={story.id}
        src={story.media_url}
        poster={story.thumbnail_url ?? undefined}
        muted={isMuted}
        playsInline
        autoPlay={isActive && !isPaused}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

  return (
    <Image
      key={story.id}
      src={story.media_url}
      alt=""
      fill
      quality={95}
      sizes="360px"
      className="object-cover"
      priority={isActive}
    />
  );
}
