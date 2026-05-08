"use client";

import Image from "next/image";
import { useState } from "react";
import {
  BadgeCheck,
  ChevronRight,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import {
  sidebarCategories,
  picksForYou,
  featuredCategories,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Props = {
  picksTitle: string;
  featuredTitle: string;
  filters: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
};

export function CategoryMegaMenu({
  picksTitle,
  featuredTitle,
  filters,
}: Props) {
  const [activeId, setActiveId] = useState("men-clothing");

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center gap-2">
        <FilterChip
          icon={<Tag className="size-3.5" />}
          label={filters.onSale}
          tone="rose"
        />
        <FilterChip
          icon={<Truck className="size-3.5" />}
          label={filters.freeDelivery}
          tone="emerald"
        />
        <FilterChip
          icon={<BadgeCheck className="size-3.5" />}
          label={filters.original}
          tone="blue"
        />
        <FilterChip
          icon={<Sparkles className="size-3.5" />}
          label={filters.new}
          tone="amber"
        />
      </div>

      <div className="grid grid-cols-[260px_1fr_300px] gap-6">
        <ul className="flex flex-col">
          {sidebarCategories.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveId(c.id)}
                onFocus={() => setActiveId(c.id)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-medium hover:bg-muted",
                  activeId === c.id && "bg-muted",
                )}
              >
                <span>{c.name}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </button>
            </li>
          ))}
        </ul>

        <div>
          <h3 className="mb-4 text-base font-bold">{picksTitle}</h3>
          <div className="grid grid-cols-8 gap-x-3 gap-y-5">
            {picksForYou.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex flex-col items-center gap-2 text-center"
              >
                <span className="grid size-16 place-items-center overflow-hidden rounded-full bg-muted">
                  <Image
                    src={item.image ?? "/placeholders/category.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="size-full object-cover"
                  />
                </span>
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold">{featuredTitle}</h3>
          <div className="grid grid-cols-3 gap-x-3 gap-y-5">
            {featuredCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex flex-col items-center gap-2 text-center"
              >
                <span
                  className={cn(
                    "relative grid size-16 place-items-center overflow-hidden rounded-full bg-muted",
                    item.badge && "ring-2 ring-rose-500 ring-offset-2",
                  )}
                >
                  <Image
                    src={item.image ?? "/placeholders/category.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="size-full object-cover"
                  />
                  {item.badge && (
                    <span className="absolute -right-1 -top-1 grid h-5 min-w-9 place-items-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className="line-clamp-1 text-xs text-foreground">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const toneStyles = {
  rose: "bg-rose-100 text-rose-700",
  emerald: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
  amber: "bg-amber-100 text-amber-700",
} as const;

function FilterChip({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: keyof typeof toneStyles;
}) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
    >
      <span
        className={cn(
          "grid size-5 place-items-center rounded-full",
          toneStyles[tone],
        )}
      >
        {icon}
      </span>
      {label}
    </button>
  );
}
