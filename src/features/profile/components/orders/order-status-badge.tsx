import { AlertCircle, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/features/profile/interfaces/order.interface";

interface IProps {
  status: OrderStatus;
  unpaidLabel: string;
  returnLabel: string;
}

export function OrderStatusBadge({ status, unpaidLabel, returnLabel }: IProps) {
  if (status === "unpaid") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600",
        )}
      >
        <AlertCircle className="size-3.5" />
        {unpaidLabel}
      </span>
    );
  }

  if (status === "return") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700",
        )}
      >
        <Undo2 className="size-3.5" />
        {returnLabel}
      </span>
    );
  }

  return null;
}
