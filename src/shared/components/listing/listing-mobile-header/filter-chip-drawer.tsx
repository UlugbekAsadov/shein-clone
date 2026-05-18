"use client";

import { X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  trigger: React.ReactNode;
  title: string;
  applyLabel: string;
  onApply?: () => void;
  children: React.ReactNode;
}

export function FilterChipDrawer({
  trigger,
  title,
  applyLabel,
  onApply,
  children,
}: IProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100 max-h-[80vh]">
        <DrawerHeader className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerClose
            aria-label={`Close ${title} filter`}
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <X className="size-4" />
          </DrawerClose>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          {children}
        </div>
        <div className="sticky bottom-0 z-10 shrink-0 border-t bg-popover p-4">
          <DrawerClose asChild>
            <Button
              type="button"
              size="lg"
              onClick={onApply}
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
