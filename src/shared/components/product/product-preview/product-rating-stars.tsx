import { Star } from "@solar-icons/react/ssr";

export function ProductRatingStars() {
  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <Star key={i} className="size-3.5" weight="Bold" />
      ))}
      <Star className="size-3.5 text-primary/20" weight="Bold" />
      <span className="text-xs font-bold">4.5</span>
    </div>
  );
}
