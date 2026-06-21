import { Star } from "@solar-icons/react/ssr";

interface IProps {
  rating: number;
  reviews: number;
  sold: number;
}

export function ProductMobileRatingRow({ rating, reviews, sold }: IProps) {
  return (
    <div className="mt-2 flex items-center gap-2 text-xs">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3].map((i) => (
          <Star key={i} weight="Bold" className="size-3.5 text-foreground" />
        ))}
        <Star weight="Bold" className="size-4 text-foreground/20" />
      </div>
      <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
      <span className="h-3 w-px bg-border" aria-hidden />
      <span className="text-muted-foreground">{reviews} reviews</span>
      <span className="h-3 w-px bg-border" aria-hidden />
      <span className="text-muted-foreground">{sold} sold</span>
    </div>
  );
}
