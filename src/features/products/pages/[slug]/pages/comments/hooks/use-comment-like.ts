"use client";

import { useState } from "react";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { getClientSessionId } from "@/lib/session-id";

export function useCommentLike(
  commentId: string,
  initialLiked: boolean,
  initialCount: number,
) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const toggle = () => {
    const nextLiked = !liked;

    setLiked(nextLiked);
    setCount((prev) => prev + (nextLiked ? 1 : -1));

    productDetailApi.likeComment(commentId, getClientSessionId()).catch(() => {
      setLiked(!nextLiked);
      setCount((prev) => prev + (nextLiked ? -1 : 1));
    });
  };

  return { liked, count, toggle };
}
