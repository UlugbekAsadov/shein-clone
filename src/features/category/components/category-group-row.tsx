"use client";

import { AltArrowRight } from "@solar-icons/react";
import type { ICategory } from "@/features/category/utils/category-group.interface";
import { CategorySquircle } from "@/shared/components/category/category-squircle";

interface IProps {
  group: ICategory;
  onClick: (group: ICategory) => void;
}

export function CategoryGroupRow({ group, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(group)}
      className="flex w-full items-center gap-3 py-2 text-left"
    >
      <CategorySquircle
        src={group.image_url}
        alt={group.title}
        sizes="56px"
        className="size-13 shrink-0 bg-[#F3F3F3]"
        ringClassName="inset-[2px] bg-secondary"
        imageClassName="object-contain p-2 pb-0"
      />

      <span className="flex-1 text-base font-bold text-foreground">
        {group.title}
      </span>

      <AltArrowRight className="size-6 text-muted-foreground" />
    </button>
  );
}
