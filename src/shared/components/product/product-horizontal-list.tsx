"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { IProduct } from "@/types/product.interface";
import { ProductSliderCard } from "./product-slider-card";

interface IProps {
  products: IProduct[];
  variant?: "default" | "dark";
}

const MAX_ROTATION_DEG = 3;
const MAX_SCALE_Y_DOWN = 0.1;

export function ProductHorizontalList({ products, variant }: IProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    skipSnaps: false,
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.rootNode();
    const slideNodes = emblaApi.slideNodes();

    const update = () => {
      const rect = viewport.getBoundingClientRect();
      const containerCenter = rect.left + rect.width / 2;

      slideNodes.forEach((slide) => {
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;
        const distance = slideCenter - containerCenter;
        const ratio = Math.max(-1, Math.min(1, distance / slideRect.width));
        const rotation = ratio * MAX_ROTATION_DEG;
        const scaleY = 1 - Math.abs(ratio) * MAX_SCALE_Y_DOWN;
        slide.style.transform = `rotate(${rotation}deg) scaleY(${scaleY})`;
        slide.style.transformOrigin = "center bottom";
        slide.style.zIndex = `${100 - Math.round(Math.abs(ratio) * 100)}`;
      });
    };

    emblaApi.on("scroll", update);
    emblaApi.on("reInit", update);
    update();

    return () => {
      emblaApi.off("scroll", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="overflow-hidden pb-1">
      <div className="flex gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="min-w-0 shrink-0 grow-0 basis-[52%] origin-center will-change-transform first:ml-[20%] last:mr-[14%]"
          >
            <ProductSliderCard product={p} variant={variant} />
          </div>
        ))}
      </div>
    </div>
  );
}
