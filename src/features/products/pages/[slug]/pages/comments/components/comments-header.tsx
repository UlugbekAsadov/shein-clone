"use client";

import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  totalLabel: string;
}

export function CommentsHeader({ totalLabel }: IProps) {
  const dict = useDictionary();

  return (
    <h1 className="text-xl font-bold">
      {dict.comments.customerReviews} ({totalLabel})
    </h1>
  );
}
