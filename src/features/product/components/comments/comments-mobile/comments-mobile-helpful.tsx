"use client";

import { useState } from "react";
import { Heart } from "@solar-icons/react";
import { cn } from "@/lib/utils";

interface IProps {
  count: number;
  initialLiked?: boolean;
}

export function CommentsMobileHelpful({ count, initialLiked = false }: IProps) {
  const [liked, setLiked] = useState(initialLiked);

  return (
    <button
      type="button"
      onClick={() => setLiked((v) => !v)}
      className="flex items-center gap-2 text-sm"
    >
      <span className="text-muted-foreground text-xs">Helpful ({count})</span>
      <Heart
        weight={liked ? "Bold" : "Linear"}
        className={cn(
          "size-5 transition-colors",
          liked ? "text-rose-500" : "text-muted-foreground",
        )}
      />
    </button>
  );
}
