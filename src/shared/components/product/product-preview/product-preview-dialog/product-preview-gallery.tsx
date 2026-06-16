"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { AltArrowLeft, AltArrowRight, Heart } from "@solar-icons/react";

interface IProps {
  images: string[];
  alt: string;
}

export function ProductPreviewGallery({ images, alt }: IProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [imageIndex, setImageIndex] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [railHeight, setRailHeight] = useState<number>();

  useEffect(() => {
    const el = mainImageRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setRailHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setImageIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const goPrev = () => emblaApi?.scrollPrev();
  const goNext = () => emblaApi?.scrollNext();

  return (
    <div className="flex items-start gap-3">
      <div
        className="flex  flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden p-1"
        style={{ maxHeight: railHeight }}
      >
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "relative aspect-3/4 cursor-pointer overflow-hidden rounded-[16px] min-w-[88px] min-h-[117px] ring-2 transition",
              i === imageIndex
                ? "ring-foreground"
                : "ring-transparent hover:ring-muted-foreground/40",
            )}
            aria-label={`Gallery image ${i + 1}`}
          >
            <Image
              src={src}
              alt=""
              fill
              quality={90}
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div
        ref={mainImageRef}
        className="group relative aspect-3/4 flex-1 cursor-zoom-in overflow-hidden rounded-2xl bg-muted"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setZoomOrigin({ x, y });
        }}
      >
        <div ref={emblaRef} className="h-full w-full overflow-hidden">
          <div className="flex h-full">
            {images.map((src, i) => (
              <div
                key={src}
                className="relative h-full w-full shrink-0 grow-0 basis-full overflow-hidden"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  quality={95}
                  sizes="(min-width: 768px) 40vw, 90vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform: zooming ? "scale(1.8)" : "scale(1)",
                    transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onMouseLeave={() => setZooming(true)}
          onMouseEnter={() => setZooming(false)}
          aria-label="Add to wishlist"
          className="absolute right-5 top-5 z-10 grid size-12.5 cursor-pointer place-items-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:bg-white"
        >
          <Heart className="size-8.5 text-secondary-foreground" />
        </button>

        <button
          type="button"
          onMouseLeave={() => setZooming(true)}
          onMouseEnter={() => setZooming(false)}
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute left-5 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/60 text-foreground shadow-sm transition hover:bg-white"
        >
          <AltArrowLeft className="size-6" />
        </button>
        <button
          type="button"
          onMouseLeave={() => setZooming(true)}
          onMouseEnter={() => setZooming(false)}
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-5 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white/60 text-foreground shadow-sm transition hover:bg-white"
        >
          <AltArrowRight className="size-6" />
        </button>
      </div>
    </div>
  );
}
