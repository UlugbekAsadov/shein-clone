import { cn } from "@/lib/utils";
import type { IOrderBrand } from "@/features/profile/interfaces/order.interface";

interface IProps {
  brand: IOrderBrand;
}

export function OrderBrandBadge({ brand }: IProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        brand.variant === "brand" && "bg-emerald-100 text-emerald-700",
        brand.variant === "trend" && "bg-violet-100 text-violet-700",
      )}
    >
      {brand.label}
    </span>
  );
}
