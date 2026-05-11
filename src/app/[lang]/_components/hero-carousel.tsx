"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

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
    <div className="mx-auto max-w-[1440px] px-6">
      <div className="relative overflow-hidden rounded-3xl bg-muted">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((s) => (
            <div key={s.id} className="relative aspect-1600/500 w-full shrink-0">
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
          className="absolute left-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full bg-background/70 transition-all",
                i === index ? "w-8 bg-background" : "w-1.5",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
