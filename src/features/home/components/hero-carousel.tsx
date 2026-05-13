"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/shared/mocks";
import { cn } from "@/lib/utils";
import { AltArrowLeft, AltArrowRight } from "@solar-icons/react";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const total = heroSlides.length;

  const goPrev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const goNext = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const id = setInterval(goNext, 5000);
    return () => clearInterval(id);
  }, [goNext]);

  return (
    <div className="mx-auto max-w-360 px-4 md:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-muted md:rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((s) => (
            <div
              key={s.id}
              className="relative aspect-2/1 w-full shrink-0 md:aspect-1600/500"
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

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full bg-background/70 transition-all",
                i === index ? "w-11 bg-background" : "w-2.5",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
