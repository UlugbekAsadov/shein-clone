"use client";

import { cn } from "@/lib/utils";

interface IChipItem {
  id: number;
  name: string;
  hex?: string;
}

interface IProps {
  items: IChipItem[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function FilterMobileChipList({ items, selectedIds, onChange }: IProps) {
  const toggle = (id: number) =>
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((i) => i !== id)
        : [...selectedIds, id],
    );

  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2">
        {items.map((item) => {
          const active = selectedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={cn(
                "inline-flex h-9.5 shrink-0 items-center gap-2 rounded-[10px] px-3.5 text-sm font-medium transition-colors cursor-pointer",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-muted",
              )}
            >
              {item.hex !== undefined && (
                <span
                  className="size-4 shrink-0 rounded-full border border-border"
                  style={{ backgroundColor: item.hex || "transparent" }}
                />
              )}
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
