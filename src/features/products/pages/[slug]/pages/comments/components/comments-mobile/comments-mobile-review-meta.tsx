import type { IReviewMeta } from "@/features/products/pages/[slug]/utils/review.interface";

interface IProps {
  meta: IReviewMeta[];
}

export function CommentsMobileReviewMeta({ meta }: IProps) {
  const items = meta.filter((m) => m.id !== "qty");

  return (
    <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-1">
          <span className="text-muted-foreground">{item.label}:</span>
          <span className="font-semibold text-foreground">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
