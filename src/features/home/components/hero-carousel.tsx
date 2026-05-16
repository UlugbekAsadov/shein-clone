"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { heroSlides } from "@/shared/mocks";
import { cn } from "@/lib/utils";
import { AltArrowLeft, AltArrowRight } from "@solar-icons/react";

export function HeroCarousel() {
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
  const goTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div className="mx-auto max-w-360 px-4 md:px-6">
      <div className="relative overflow-hidden rounded-[14px] bg-muted md:rounded-3xl">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-3">
            {heroSlides.map((s) => (
              <div
                key={s.id}
                className="relative aspect-351/100 w-full shrink-0 grow-0 basis-full overflow-hidden rounded-[14px] md:aspect-1600/500"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  quality={95}
                  className="object-cover"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur hover:bg-background md:grid"
        >
          <AltArrowLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-background/60 backdrop-blur hover:bg-background md:grid"
        >
          <AltArrowRight className="size-6" />
        </button>

        <div className="absolute bottom-2 md:bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
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
