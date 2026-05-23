import { Package, Truck, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IOrderProgressStep } from "@/features/orders/utils/order.interface";

interface IProps {
  steps: IOrderProgressStep[];
}

const iconMap = {
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle2,
} as const;

const stateMap = {
  processing: {
    active: "bg-orange-100 text-orange-600",
    done: "bg-orange-100 text-orange-600",
    pending: "bg-muted text-muted-foreground",
  },
  shipped: {
    active: "bg-blue-100 text-blue-600",
    done: "bg-blue-100 text-blue-600",
    pending: "bg-muted text-muted-foreground",
  },
  delivered: {
    active: "bg-green-100 text-green-700",
    done: "bg-green-100 text-green-700",
    pending: "bg-muted text-muted-foreground",
  },
} as const;

export function OrderProgress({ steps }: IProps) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, idx) => {
        const Icon = iconMap[step.id];
        const palette = stateMap[step.id][step.state];
        return (
          <div key={step.id} className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[8px] px-2 py-[5px] text-xs font-bold",
                palette,
              )}
            >
              <Icon className="size-5" />
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "h-px w-3",
                  step.state === "pending" ? "bg-muted" : "bg-foreground/20",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
