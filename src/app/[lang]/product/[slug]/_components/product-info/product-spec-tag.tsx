import type { IProductSpec } from "../../_lib/interface/product-detail.interface";

interface IProps {
  spec: IProductSpec;
}

export function ProductSpecTag({ spec }: IProps) {
  return (
    <div className="rounded-xl border border-border px-3 py-2">
      <div className="text-xs text-muted-foreground">{spec.label}</div>
      <div className="mt-0.5 text-sm font-semibold">{spec.value}</div>
    </div>
  );
}
