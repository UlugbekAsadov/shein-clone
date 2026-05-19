"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Tuning2 } from "@solar-icons/react";
import { CommentsMobileFilterDrawer } from "./comments-mobile-filter-drawer";

interface IProps {
  title: string;
  applyLabel: string;
}

export function CommentsMobileHeader({ title, applyLabel }: IProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="flex-1 text-center text-lg font-bold text-foreground">
          {title}
        </h1>

        <CommentsMobileFilterDrawer
          applyLabel={applyLabel}
          trigger={
            <button
              type="button"
              aria-label="Filter"
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
