import { ProductShippingRow } from "./product-shipping-row";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { DollarMinimalistic, ShieldCheck, Shop } from "@solar-icons/react/ssr";
import type { IProductHighlight } from "@/features/product/pages/[slug]/utils/product-detail.interface";

interface IProps {
  highlights: IProductHighlight[];
}

const HIGHLIGHT_ICONS = [
  <TruckIconSolid key="truck" className="size-6 fill-emerald-600" />,
  <DollarMinimalistic key="dollar" className="size-6 text-foreground" weight="Bold" />,
  <ShieldCheck key="shield" className="size-6 text-foreground" weight="Bold" />,
  <Shop key="shop" className="size-6 text-foreground" weight="Bold" />,
];

export function ProductShippingInfo({ highlights }: IProps) {
  return (
    <div className="rounded-[12px] bg-secondary p-5 space-y-4">
      {highlights.map((highlight, i) => (
        <ProductShippingRow
          key={highlight.title}
          icon={HIGHLIGHT_ICONS[i] ?? HIGHLIGHT_ICONS[HIGHLIGHT_ICONS.length - 1]}
        >
          <div className="font-semibold text-foreground text-xs">
            {highlight.title}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {highlight.description}
          </div>
        </ProductShippingRow>
      ))}
    </div>
  );
}
