"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AltArrowLeft, AltArrowRight } from "@solar-icons/react";
import { IReview } from "../../utils/review.interface";
import { ProductReviewCard } from "./product-review-card";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  reviews: IReview[];
}

export const ProductReviews = ({ reviews }: IProps) => {
  const dict = useDictionary();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative mt-4">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="min-w-0 shrink-0 grow-0 basis-[85%] md:basis-[47%] lg:basis-[31.5%]"
            >
              <ProductReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        aria-label={dict.product.previousReviews}
        className="absolute -left-5 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background text-foreground shadow-md transition hover:bg-background/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AltArrowLeft className="size-5" weight="Outline" />
      </button>

      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        aria-label={dict.product.nextReviews}
        className="absolute -right-5 top-1/2 z-10 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-background text-foreground shadow-md transition hover:bg-background/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <AltArrowRight className="size-5" weight="Outline" />
      </button>
    </div>
  );
};
