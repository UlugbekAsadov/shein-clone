import type { IProductSpec } from "@/features/product/interfaces/product-detail.interface";

interface IProps {
  spec: IProductSpec;
}

export function ProductSpecTag({ spec }: IProps) {
  return (
    <div className="rounded-2xl bg-muted px-4 py-2">
      <div className="text-[11px] text-muted-foreground">{spec.label}</div>
      <div className="text-sm font-semibold text-foreground">{spec.value}</div>
    </div>
  );
}
