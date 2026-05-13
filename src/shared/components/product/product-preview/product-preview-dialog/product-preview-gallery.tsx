"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AltArrowLeft, AltArrowRight, Heart } from "@solar-icons/react";

interface IProps {
  images: string[];
  alt: string;
}

export function ProductPreviewGallery({ images, alt }: IProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zooming, setZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const goPrev = () =>
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setImageIndex((i) => (i + 1) % images.length);

  return (
    <div className="flex gap-3">
      <div className="flex w-20 flex-col gap-2">
        {images.map((src, i) => (
          <button
            type="button"
            key={src}
            onClick={() => setImageIndex(i)}
            className={cn(
              "relative aspect-3/4 cursor-pointer overflow-hidden rounded-[16px] ring-2 transition",
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
        className="group relative aspect-4/5 flex-1 cursor-zoom-in overflow-hidden rounded-2xl bg-muted"
        onMouseEnter={() => setZooming(true)}
        onMouseLeave={() => setZooming(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setZoomOrigin({ x, y });
        }}
      >
        <div
          className="absolute inset-y-0 left-0 flex h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translate3d(-${(imageIndex * 100) / images.length}%, 0, 0)`,
            transition: "transform 500ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-full shrink-0 overflow-hidden"
              style={{ width: `${100 / images.length}%` }}
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
