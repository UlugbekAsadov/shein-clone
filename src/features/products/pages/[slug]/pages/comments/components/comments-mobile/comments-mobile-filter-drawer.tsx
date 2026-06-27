"use client";

import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import type { ICommentsFilterGroup } from "@/features/products/pages/[slug]/pages/comments/utils/comments-filter-group.interface";
import type { ICommentsSortControl } from "@/features/products/pages/[slug]/pages/comments/utils/comments-sort.interface";
import { CommentsMobileFilterContent } from "./comments-mobile-filter-content";

interface IProps {
  trigger: React.ReactNode;
  applyLabel: string;
  groups: ICommentsFilterGroup[];
  sort: ICommentsSortControl;
}

export function CommentsMobileFilterDrawer({
  trigger,
  applyLabel,
  groups,
  sort,
}: IProps) {
  const dict = useDictionary();

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100 max-h-[92vh]">
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {dict.comments.filterTitle}
          </DrawerTitle>
          <DrawerClose
            aria-label={dict.comments.closeFilter}
            className="grid size-8 place-items-center rounded-full text-foreground"
          >
            <XIcon className="size-5" />
          </DrawerClose>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <CommentsMobileFilterContent groups={groups} sort={sort} />
        </div>

        <div className="sticky bottom-0 z-10 shrink-0 border-t bg-popover p-4">
          <DrawerClose asChild>
            <Button
              type="button"
              size="lg"
              className="h-13 w-full rounded-[14px] text-base font-bold"
            >
              {applyLabel}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
