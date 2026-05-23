"use client";

import { useEffect, useRef } from "react";

interface IItem {
  value: string;
  label: string;
}

interface IProps {
  items: IItem[];
  value: string;
  onChange: (value: string) => void;
  itemHeight?: number;
  align?: "left" | "center" | "right";
}

export function WheelPickerColumn({
  items,
  value,
  onChange,
  itemHeight = 44,
  align = "center",
}: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const index = items.findIndex((item) => item.value === value);
    if (index < 0) return;
    if (lastValue.current === value) {
      node.scrollTo({ top: index * itemHeight, behavior: "auto" });
    }
    lastValue.current = value;
  }, [items, value, itemHeight]);

  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const node = ref.current;
      if (!node) return;
      const index = Math.round(node.scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      const next = items[clamped];
      if (next && next.value !== value) {
        lastValue.current = next.value;
        onChange(next.value);
      }
      node.scrollTo({ top: clamped * itemHeight, behavior: "smooth" });
    }, 120);
  };

  const handleItemClick = (item: IItem, index: number) => {
    lastValue.current = item.value;
    onChange(item.value);
    ref.current?.scrollTo({ top: index * itemHeight, behavior: "smooth" });
  };

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div
      ref={ref}
      onScroll={handleScroll}
      className="relative h-[132px] flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ paddingTop: itemHeight, paddingBottom: itemHeight }}
    >
      {items.map((item, index) => (
        <button
          key={item.value}
          type="button"
          onClick={() => handleItemClick(item, index)}
          className={`flex w-full snap-center items-center justify-center text-2xl font-medium transition-colors ${alignClass} ${
            item.value === value
              ? "text-foreground"
              : "text-muted-foreground/40"
          }`}
          style={{ height: itemHeight }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
