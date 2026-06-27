"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Tuning2 } from "@solar-icons/react";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type { ICommentsFilterGroup } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-group.interface";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";
import { CommentsMobileFilterDrawer } from "./comments-mobile-filter-drawer";

interface IProps {
  title: string;
  applyLabel: string;
  groups: ICommentsFilterGroup[];
  sort: ICommentsSortControl;
}

export function CommentsMobileHeader({
  title,
  applyLabel,
  groups,
  sort,
}: IProps) {
  const router = useRouter();
  const dict = useDictionary();

  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={dict.comments.goBack}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="flex-1 text-center text-lg font-bold text-foreground">
          {title}
        </h1>

        <CommentsMobileFilterDrawer
          applyLabel={applyLabel}
          groups={groups}
          sort={sort}
          trigger={
            <button
              type="button"
              aria-label={dict.comments.filterTitle}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
            >
              <Tuning2 className="size-6 rotate-90" />
            </button>
          }
        />
      </div>
    </div>
  );
}
