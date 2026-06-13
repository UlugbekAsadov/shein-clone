"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AltArrowLeft, AltArrowRight } from "@solar-icons/react";
import { cn } from "@/lib/utils";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IBanner } from "@/features/home/utils/banner.interface";
import { BannerSlide } from "./banner-slide";

interface IProps {
  lang: (typeof locales)[number];
  banners: IBanner[];
}

export function HeroCarousel({ lang, banners }: IProps) {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const goPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  if (banners.length === 0) return null;

  return (
    <div className="mx-auto max-w-360 px-4 md:px-6">
      <div className="relative overflow-hidden rounded-[14px] bg-muted md:rounded-3xl">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-3">
            {banners.map((banner, i) => (
              <BannerSlide
                key={`${banner.id}-${i}`}
                banner={banner}
                lang={lang}
                priority={i === 0}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute cursor-pointer left-4 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur hover:bg-background md:grid"
        >
          <AltArrowLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute cursor-pointer right-4 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur hover:bg-background md:grid"
        >
          <AltArrowRight className="size-6" />
        </button>

        <div className="absolute bottom-2 md:bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {banners.map((banner, i) => (
            <button
              key={`${banner.id}-${i}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 md:h-2.5 rounded-full bg-background/70 transition-all",
                i === selectedIndex
                  ? "w-8.75 md:w-11 bg-background"
                  : "w-2 md:w-2.5",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
