"use client";

import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type { IReview } from "@/features/products/pages/[slug]/utils/review.interface";
import type { ICommentsFilterGroup } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-group.interface";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";
import { CommentsMobileHeader } from "./comments-mobile-header";
import { CommentsMobileReviewCard } from "./comments-mobile-review-card";

interface IProps {
  reviews: IReview[];
  applyLabel: string;
  groups: ICommentsFilterGroup[];
  sort: ICommentsSortControl;
}

export function CommentsMobilePage({
  reviews,
  applyLabel,
  groups,
  sort,
}: IProps) {
  const dict = useDictionary();

  return (
    <div className="pb-6 md:hidden">
      <CommentsMobileHeader
        title={dict.comments.title}
        applyLabel={applyLabel}
        groups={groups}
        sort={sort}
      />

      <div className="flex flex-col gap-3 px-4 pt-3">
        {reviews.map((review) => (
          <CommentsMobileReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
