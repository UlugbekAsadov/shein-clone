"use client";

import { FilterChip } from "@/shared/components/category/filter-chip";
import { Sale, ShieldCheck } from "@solar-icons/react";

interface IProps {
  title: string;
  labels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
  availableKeys: string[];
  hasDiscount: boolean;
  isOriginal: boolean;
  onToggle: (key: "hasDiscount" | "isOriginal", value: boolean) => void;
}

export function FilterQuickFilters({
  title,
  labels,
  availableKeys,
  hasDiscount,
  isOriginal,
  onToggle,
}: IProps) {
  return (
    <div className="py-5">
      <p className="font-bold">{title}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {availableKeys.includes("has_discount") && (
          <FilterChip
            icon={<Sale className="size-4.5 text-[#E83737]" weight="Bold" />}
            label={labels.onSale}
            tone="rose"
            active={hasDiscount}
            onClick={() => onToggle("hasDiscount", !hasDiscount)}
          />
        )}
        {availableKeys.includes("is_original") && (
          <FilterChip
            icon={<ShieldCheck className="size-4.5 text-[#387FF1]" weight="Bold" />}
            label={labels.original}
            tone="blue"
            active={isOriginal}
            onClick={() => onToggle("isOriginal", !isOriginal)}
          />
        )}
      </div>
    </div>
  );
}
