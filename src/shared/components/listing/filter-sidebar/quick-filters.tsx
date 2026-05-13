import { FilterChip } from "@/shared/components/category/filter-chip";
import { Sale, ShieldCheck, Tag } from "@solar-icons/react/ssr";
import { TruckIconSolid } from "../../icons/solid";

interface IProps {
  title: string;
  filters: {
    onSale: string;
    freeDelivery: string;
    original: string;
    new: string;
  };
}

export function QuickFilters({ filters, title }: IProps) {
  return (
    <div className="py-5">
      <p className="font-bold">{title}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        <FilterChip
          icon={<Sale className="size-4.5 text-[#E83737]" weight="Bold" />}
          label={filters.onSale}
          tone="rose"
        />
        <FilterChip
          icon={<TruckIconSolid className="size-4.5 fill-[#21BE65]" />}
          label={filters.freeDelivery}
          tone="emerald"
        />
        <FilterChip
          icon={
            <ShieldCheck className="size-4.5 text-[#387FF1]" weight="Bold" />
          }
          label={filters.original}
          tone="blue"
        />
        <FilterChip
          icon={<Tag className="size-4.5 text-[#F59E0B]" weight="Bold" />}
          label={filters.new}
          tone="amber"
        />
      </div>
    </div>
  );
}
