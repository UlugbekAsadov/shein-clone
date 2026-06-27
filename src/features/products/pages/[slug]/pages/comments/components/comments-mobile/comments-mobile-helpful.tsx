"use client";

import { useState } from "react";
import { Heart } from "@solar-icons/react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  count: number;
  initialLiked?: boolean;
}

export function CommentsMobileHelpful({ count, initialLiked = false }: IProps) {
  const [liked, setLiked] = useState(initialLiked);
  const dict = useDictionary();

  return (
    <button
      type="button"
      onClick={() => setLiked((v) => !v)}
      className="flex items-center gap-2 text-sm"
    >
      <span className="text-muted-foreground text-xs">
        {dict.comments.helpful} ({count})
      </span>
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
