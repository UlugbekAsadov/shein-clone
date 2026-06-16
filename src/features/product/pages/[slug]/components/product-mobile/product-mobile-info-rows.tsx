import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import {
  AltArrowRight,
  DollarMinimalistic,
  ShieldCheck,
  Shop,
} from "@solar-icons/react/ssr";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import type { IProductHighlight } from "@/features/product/pages/[slug]/utils/product-detail.interface";

interface IProps {
  highlights: IProductHighlight[];
}

const HIGHLIGHT_ICONS: Array<ComponentType<IconProps> | (() => React.ReactElement)> = [
  () => <TruckIconSolid className="size-6 fill-emerald-600" />,
  DollarMinimalistic,
  ShieldCheck,
  Shop,
];

interface IRowProps {
  icon: ComponentType<IconProps> | (() => React.ReactElement);
  title: string;
  subtitle?: string;
}

function InfoRow({ icon: Icon, title, subtitle }: IRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="grid size-9 shrink-0 place-items-center text-foreground">
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

export function ProductMobileInfoRows({ highlights }: IProps) {
  return (
    <div className="mt-5 flex flex-col bg-secondary rounded-[18px]">
      {highlights.map((highlight, i) => (
        <InfoRow
          key={highlight.title}
          icon={HIGHLIGHT_ICONS[i] ?? HIGHLIGHT_ICONS[HIGHLIGHT_ICONS.length - 1]}
          title={highlight.title}
          subtitle={highlight.description}
        />
      ))}
    </div>
  );
}
