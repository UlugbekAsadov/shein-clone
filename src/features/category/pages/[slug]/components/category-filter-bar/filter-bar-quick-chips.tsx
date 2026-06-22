"use client";

import { FilterChip } from "@/shared/components/category/filter-chip";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { Sale, ShieldCheck, Delivery, Tag } from "@solar-icons/react";

interface IProps {
  labels: {
    onSale: string;
    original: string;
    freeDelivery: string;
    new: string;
  };
  availableKeys: string[];
  hasDiscount: boolean;
  isOriginal: boolean;
  freeDelivery: boolean;
  isNew: boolean;
  onToggle: (
    key: "hasDiscount" | "isOriginal" | "freeDelivery" | "isNew",
    value: boolean,
  ) => void;
}

export function FilterBarQuickChips({
  labels,
  availableKeys,
  hasDiscount,
  isOriginal,
  freeDelivery,
  isNew,
  onToggle,
}: IProps) {
  return (
    <>
      {availableKeys.includes("has_discount") && (
        <FilterChip
          icon={<Sale className="size-4.5 text-[#E83737]" weight="Bold" />}
          label={labels.onSale}
          tone="rose"
          active={hasDiscount}
          onClick={() => onToggle("hasDiscount", !hasDiscount)}
        />
      )}
      {availableKeys.includes("free_delivery") && (
        <FilterChip
          icon={<TruckIconSolid className="size-4.5 fill-[#21BE65]" />}
          label={labels.freeDelivery}
          tone="emerald"
          active={freeDelivery}
          onClick={() => onToggle("freeDelivery", !freeDelivery)}
        />
      )}
      {availableKeys.includes("is_original") && (
        <FilterChip
          icon={
            <ShieldCheck className="size-4.5 text-[#387FF1]" weight="Bold" />
          }
          label={labels.original}
          tone="blue"
          active={isOriginal}
          onClick={() => onToggle("isOriginal", !isOriginal)}
        />
      )}
      {availableKeys.includes("is_new") && (
        <FilterChip
          icon={<Tag className="size-4.5 text-[#F47E16]" weight="Bold" />}
          label={labels.new}
          tone="amber"
          active={isNew}
          onClick={() => onToggle("isNew", !isNew)}
        />
      )}
    </>
  );
}
