"use client";

import { useEffect, useRef } from "react";
import type { IProduct } from "@/types/product.interface";
import { ProductSliderCard } from "./product-slider-card";

interface IProps {
  products: IProduct[];
  variant?: "default" | "dark";
}

const MAX_ROTATION_DEG = 3;
const MAX_SCALE_Y_DOWN = 0.1;

export function ProductHorizontalList({ products, variant }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = Array.from(container.children) as HTMLElement[];

    const update = () => {
      frameRef.current = null;
      const rect = container.getBoundingClientRect();
      const containerCenter = rect.left + rect.width / 2;

      slides.forEach((slide) => {
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

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(update);
    };

    const initialSlide = slides[1];
    if (initialSlide) {
      const offset =
        initialSlide.offsetLeft -
        (container.clientWidth - initialSlide.clientWidth) / 2;
      container.scrollLeft = offset;
    }

    update();
    container.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      container.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [products.length]);

  return (
    <div
      ref={containerRef}
      className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
    >
      {products.map((p) => (
        <div
          key={p.id}
          className="w-[52%] shrink-0 origin-center snap-center transition-transform duration-150 ease-out first:ml-[20%] last:mr-[14%] will-change-transform"
        >
          <ProductSliderCard product={p} variant={variant} />
        </div>
      ))}
    </div>
  );
}
