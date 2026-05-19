import { cn } from "@/lib/utils";
import type { OrderGroupStatus } from "@/features/profile/interfaces/order-group.interface";

interface IProps {
  status: OrderGroupStatus;
  label: string;
}

const statusStyles: Record<OrderGroupStatus, string> = {
  arrived: "bg-emerald-100 text-emerald-700",
  processing: "bg-orange-100 text-orange-600",
  shipped: "bg-blue-100 text-blue-700",
  unpaid: "bg-rose-100 text-rose-600",
  review: "bg-violet-100 text-violet-700",
  return: "bg-violet-100 text-violet-700",
};

export function OrderGroupStatusBadge({ status, label }: IProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-[10px] px-2.5 py-1.5 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {label}
    </span>
  );
}
