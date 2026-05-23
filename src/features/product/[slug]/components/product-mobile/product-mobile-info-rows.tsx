import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import {
  AltArrowRight,
  DollarMinimalistic,
  ShieldCheck,
  Shop,
  Unread,
} from "@solar-icons/react/ssr";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { cn } from "@/lib/utils";

interface IRowProps {
  icon: ComponentType<IconProps> | (() => React.ReactElement);
  iconClassName?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

function InfoRow({ icon: Icon, iconClassName, title, subtitle }: IRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center text-foreground",
          iconClassName,
        )}
      >
        <Icon className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold text-foreground">{title}</div>
        {subtitle && (
          <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>
      <AltArrowRight className="size-5 text-muted-foreground" />
    </div>
  );
}

export function ProductMobileInfoRows() {
  return (
    <div className="mt-5 flex flex-col bg-secondary rounded-[18px]">
      <InfoRow
        icon={() => <TruckIconSolid className="size-6 fill-emerald-600" />}
        title={
          <span className="text-emerald-600">
            Free Shipping (Orders $20.00)
          </span>
        }
        subtitle="Free Shipping (Orders $20.00)"
      />

      <InfoRow icon={DollarMinimalistic} title="30-Day Free Returns" />

      <InfoRow
        icon={ShieldCheck}
        title="Shopping Security"
        subtitle={
          <span className="mt-1 flex flex-wrap items-center gap-3 text-foreground">
            <span className="flex items-center gap-1">
              <Unread className="size-3.5" />
              Safe Payments
            </span>
            <span className="flex items-center gap-1">
              <Unread className="size-3.5" />
              Privacy Protection
            </span>
          </span>
        }
      />

      <InfoRow
        icon={Shop}
        title="Sold by TY DIRECT Marketplace"
        subtitle="Ships from TY DIRECT Marketplace"
      />
    </div>
  );
}
