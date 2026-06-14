import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  value: string;
  color?: string;
}

function lightenHex(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.round(((num >> 16) & 0xff) * 0.15 + 255 * 0.85);
  const g = Math.round(((num >> 8) & 0xff) * 0.15 + 255 * 0.85);
  const b = Math.round((num & 0xff) * 0.15 + 255 * 0.85);
  return `rgb(${r}, ${g}, ${b})`;
}

export function ProductGroupTimerTile({ value, color }: IProps) {
  const dynamicStyle: CSSProperties | undefined = color
    ? {
        background: `linear-gradient(to bottom, ${lightenHex(color)} 50%, white 50%)`,
        color,
      }
    : undefined;

  return (
    <div
      className={cn(
        "grid size-7.5 place-items-center rounded-[8px] shadow-sm text-sm font-bold",
        !color && "bg-linear-to-b from-[#FCDADA] from-50% to-white to-50% text-red-500",
        "md:size-10 md:text-lg",
      )}
      style={dynamicStyle}
    >
      {value}
    </div>
  );
}
