"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps {
  images: string[];
  alt: string;
}

export function ProductMobileGallery({ images, alt }: IProps) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== activeIndex) setActiveIndex(i);
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid size-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm"
        >
          <ArrowLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Add to wishlist"
          className="grid size-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm"
        >
          <Heart className="size-5" />
        </button>
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex aspect-5/6 snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full w-full shrink-0 snap-center bg-muted"
          >
            <Image
              src={src}
              alt={alt}
              fill
              quality={95}
              sizes="950vw"
              priority={i === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex items-center justify-center gap-1.5">
        {images.map((_, i) => {
          const active = i === activeIndex;
          return (
            <span
              key={i}
              className={cn(
                "rounded-full bg-white transition-all",
                active ? "h-2 w-9" : "size-2 opacity-40",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
