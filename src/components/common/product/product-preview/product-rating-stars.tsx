import { Star } from "lucide-react";

export function ProductRatingStars() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3].map((i) => (
        <Star key={i} className="size-4 fill-primary text-primary" />
      ))}
      <Star className="size-4 fill-primary/40 text-primary/40" />
    </div>
  );
}
