"use client";

import Image from "next/image";
import { AltArrowRight } from "@solar-icons/react";
import type { ICategory } from "@/features/category/utils/category-group.interface";

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
      <div className="relative size-13 shrink-0 overflow-hidden rounded-[18px] bg-secondary ring-2 ring-[#F3F3F3]">
        <Image
          src={group.image_url}
          alt={group.title}
          fill
          sizes="56px"
          className="object-contain p-2 pb-0"
        />
      </div>

      <span className="flex-1 text-base font-bold text-foreground">
        {group.title}
      </span>

      <AltArrowRight className="size-6 text-muted-foreground" />
    </button>
  );
}
