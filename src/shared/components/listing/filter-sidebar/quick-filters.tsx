import { BadgeCheck, Sparkles, Tag, Truck } from "lucide-react";
import { FilterChip } from "@/shared/components/category/filter-chip";

interface IProps {
  filters: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
}

export function QuickFilters({ filters }: IProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
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
  );
}
