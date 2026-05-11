import { Star } from "lucide-react";

interface IProps {
  rating: number;
}

export function ProductRatingStars({ rating }: IProps) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
      ))}
      <Star className="size-4 fill-amber-400/40 text-amber-400" />
      <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}
