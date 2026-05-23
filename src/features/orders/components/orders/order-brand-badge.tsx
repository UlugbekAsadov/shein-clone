import { cn } from "@/lib/utils";
import type { IOrderBrand } from "@/features/orders/utils/order.interface";

interface IProps {
  brand: IOrderBrand;
}

export function OrderBrandBadge({ brand }: IProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[8px] p-1.5 text-xs font-bold",
        brand.variant === "brand" && "bg-green-400 text-white",
        brand.variant === "trend" && "text-white bg-violet-600",
      )}
    >
      {brand.label}
    </span>
  );
}
