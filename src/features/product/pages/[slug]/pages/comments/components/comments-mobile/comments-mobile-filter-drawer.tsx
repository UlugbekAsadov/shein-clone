"use client";

import { CloseCircle } from "@solar-icons/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { CommentsMobileFilterContent } from "./comments-mobile-filter-content";

interface IProps {
  trigger: React.ReactNode;
  applyLabel: string;
}

export function CommentsMobileFilterDrawer({ trigger, applyLabel }: IProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100 max-h-[92vh]">
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            Filter
          </DrawerTitle>
          <DrawerClose
            aria-label="Close filter"
            className="grid size-8 place-items-center rounded-full text-foreground"
          >
            <CloseCircle className="size-5" weight="Outline" />
          </DrawerClose>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <CommentsMobileFilterContent />
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
