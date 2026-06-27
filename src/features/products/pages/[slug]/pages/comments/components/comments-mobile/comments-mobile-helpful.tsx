"use client";

import { Heart } from "@solar-icons/react";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { useCommentLike } from "@/features/products/pages/[slug]/pages/comments/hooks/use-comment-like";

interface IProps {
  commentId: string;
  count: number;
  initialLiked?: boolean;
}

export function CommentsMobileHelpful({
  commentId,
  count,
  initialLiked = false,
}: IProps) {
  const dict = useDictionary();
  const { liked, count: likeCount, toggle } = useCommentLike(
    commentId,
    initialLiked,
    count,
  );

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-2 text-sm"
    >
      <span className="text-muted-foreground text-xs">
        {dict.comments.helpful} ({likeCount})
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
