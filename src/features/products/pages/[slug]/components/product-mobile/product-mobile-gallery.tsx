"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, Heart } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps {
  images: string[];
  alt: string;
}

export function ProductMobileGallery({ images, alt }: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prevImagesRef = useRef(images);

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

  useEffect(() => {
    if (!emblaApi) return;
    if (prevImagesRef.current === images) return;
    prevImagesRef.current = images;
    emblaApi.reInit();
    emblaApi.scrollTo(0, true);
    setSelectedIndex(0);
  }, [images, emblaApi]);

  return (
    <div className="relative">
      <div
        className={cn(
          "absolute inset-x-0 top-0 z-10 flex items-center px-4 pt-3",
          callbackUrl ? "justify-between" : "justify-end",
        )}
      >
        {callbackUrl && (
          <button
            type="button"
            onClick={() => router.push(callbackUrl)}
            aria-label="Go back"
            className="grid size-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm"
          >
            <ArrowLeft className="size-5" />
          </button>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="grid size-10 place-items-center rounded-full bg-background/90 text-foreground shadow-sm"
        >
          <Heart className="size-5" />
        </button>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex aspect-5/6 touch-pan-y">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-full w-full shrink-0 basis-full bg-muted"
            >
              <Image
                src={src}
                alt={alt}
                fill
                quality={95}
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 z-10 flex items-center justify-center gap-1.5">
        {images.map((_, i) => {
          const active = i === selectedIndex;
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
