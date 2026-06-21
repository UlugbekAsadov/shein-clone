import { Shop } from "@solar-icons/react/ssr";
import type { IProductHighlight } from "@/features/products/pages/[slug]/utils/product-detail.interface";

interface IProps {
  highlight: IProductHighlight;
}

export function ProductSellerFallback({ highlight }: IProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground">
        <Shop className="size-5" weight="Bold" />
      </span>
      <div>
        <div className="text-sm font-semibold text-foreground">
          {highlight.title}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {highlight.description}
        </div>
      </div>
    </div>
  );
}
