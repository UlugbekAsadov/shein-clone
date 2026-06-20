import type { JSX } from "react";
import { FilterChip } from "@/shared/components/category/filter-chip";
import { Sale, ShieldCheck, Tag } from "@solar-icons/react/ssr";
import { TruckIconSolid } from "../../icons/solid";

interface IQuickFilterItem {
  key: string;
  label: string;
}

interface IProps {
  title: string;
  filters: IQuickFilterItem[];
  selectedFilters?: string[];
  onToggle?: (key: string) => void;
}

const QUICK_FILTER_ICONS: Record<
  string,
  { icon: JSX.Element; tone: "rose" | "emerald" | "blue" | "amber" }
> = {
  has_discount: {
    icon: <Sale className="size-4.5 text-[#E83737]" weight="Bold" />,
    tone: "rose",
  },
  free_delivery: {
    icon: <TruckIconSolid className="size-4.5 fill-[#21BE65]" />,
    tone: "emerald",
  },
  is_original: {
    icon: <ShieldCheck className="size-4.5 text-[#387FF1]" weight="Bold" />,
    tone: "blue",
  },
  is_new: {
    icon: <Tag className="size-4.5 text-[#F59E0B]" weight="Bold" />,
    tone: "amber",
  },
};

export function QuickFilters({ filters, title, selectedFilters, onToggle }: IProps) {
  if (filters.length === 0) return null;

  return (
    <div className="py-5">
      <p className="font-bold">{title}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {filters.map((f) => {
          const meta = QUICK_FILTER_ICONS[f.key];
          if (!meta) return null;
          return (
            <FilterChip
              key={f.key}
              icon={meta.icon}
              label={f.label}
              tone={meta.tone}
              active={selectedFilters?.includes(f.key)}
              onClick={() => onToggle?.(f.key)}
            />
          );
        })}
      </div>
    </div>
  );
}
