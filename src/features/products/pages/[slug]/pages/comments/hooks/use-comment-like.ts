"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productDetailApi } from "@/features/products/api/products-detail.api";
import { getClientSessionId } from "@/lib/session-id";

export function useCommentLike(
  commentId: string,
  initialLiked: boolean,
  initialCount: number,
) {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const { mutate } = useMutation<unknown, Error, boolean>({
    mutationFn: () =>
      productDetailApi.likeComment(commentId, getClientSessionId()),
    onError: (_error, nextLiked) => {
      setLiked(!nextLiked);
      setCount((prev) => prev + (nextLiked ? -1 : 1));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["product-comments"] });
    },
  });

  const toggle = () => {
    const nextLiked = !liked;

    setLiked(nextLiked);
    setCount((prev) => prev + (nextLiked ? 1 : -1));
    mutate(nextLiked);
  };

  return { liked, count, toggle };
}
