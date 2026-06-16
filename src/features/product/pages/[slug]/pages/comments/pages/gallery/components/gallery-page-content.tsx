"use client";

import { useEffect, useState } from "react";
import { CommentsStickyBar } from "@/features/product/pages/[slug]/pages/comments/components/comments-sticky-bar";
import type { IProductDetail } from "@/features/product/pages/[slug]/pages/comments/utils/product-detail.interface";
import type { IGalleryItem } from "@/features/product/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";
import { GalleryDetail } from "./gallery-detail";
import { GalleryGrid } from "./gallery-grid";

interface IProps {
  items: IGalleryItem[];
  product: IProductDetail;
  backHref: string;
}

export function GalleryPageContent({ items, product, backHref }: IProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft" && activeIndex > 0)
        setActiveIndex(activeIndex - 1);
      if (e.key === "ArrowRight" && activeIndex < items.length - 1)
        setActiveIndex(activeIndex + 1);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeIndex, items.length]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {activeIndex === null ? (
        <GalleryGrid
          items={items}
          backHref={backHref}
          onItemClick={setActiveIndex}
        />
      ) : (
        <GalleryDetail
          items={items}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
      <CommentsStickyBar product={product} />
    </div>
  );
}
