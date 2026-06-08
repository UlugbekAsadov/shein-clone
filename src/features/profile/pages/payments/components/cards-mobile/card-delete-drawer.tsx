"use client";

import type { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  trigger: ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  isPending?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm: () => void;
}

export function CardDeleteDrawer({
  trigger,
  title,
  description,
  confirmLabel,
  cancelLabel,
  isPending,
  open,
  onOpenChange,
  onConfirm,
}: IProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="z-100">
        <div className="flex flex-col items-center px-5 pt-2 pb-[max(env(safe-area-inset-bottom),1rem)] text-center">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerDescription className="mt-2 max-w-xs text-sm text-muted-foreground">
            {description}
          </DrawerDescription>

          <div className="mt-6 flex w-full flex-col gap-3">
            <Button
              type="button"
              size="lg"
              variant="destructive"
              disabled={isPending}
              onClick={onConfirm}
              className="h-12 w-full rounded-2xl text-base font-bold"
            >
              {confirmLabel}
            </Button>
            <DrawerClose asChild>
              <Button
                type="button"
                size="lg"
                variant="secondary"
                disabled={isPending}
                className="h-12 w-full rounded-2xl text-base font-bold"
              >
                {cancelLabel}
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
