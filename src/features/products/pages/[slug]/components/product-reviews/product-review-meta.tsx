"use client";

import type { IReviewMeta } from "@/features/products/pages/[slug]/utils/review.interface";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  meta: IReviewMeta[];
}

export function ProductReviewMeta({ meta }: IProps) {
  const dict = useDictionary();

  const labels: Record<string, string> = {
    color: dict.product.color,
    size: dict.product.size,
    fit: dict.product.fit,
  };

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      {meta.map((m) => (
        <span key={m.id} className="text-muted-foreground font-bold text-sm">
          {labels[m.id] ?? m.label}:{" "}
          <span className="font-normal text-xs">{m.value}</span>
        </span>
      ))}
    </div>
  );
}
