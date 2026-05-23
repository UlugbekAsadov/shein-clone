import type { IReviewMeta } from "@/features/product/pages/[slug]/utils/review.interface";

interface IProps {
  meta: IReviewMeta[];
}

export function ProductReviewMeta({ meta }: IProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      {meta.map((m) => (
        <span key={m.id} className="text-muted-foreground font-bold text-sm">
          {m.label}: <span className="font-normal text-xs">{m.value}</span>
        </span>
      ))}
    </div>
  );
}
