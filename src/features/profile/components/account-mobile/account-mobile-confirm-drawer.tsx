"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
}

export function AccountMobileConfirmDrawer({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
}: IProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-100">
        <div className="flex flex-col items-center px-5 pt-2 pb-[max(env(safe-area-inset-bottom),1rem)] text-center">
          <DrawerTitle className="text-lg font-bold text-foreground">
            {title}
          </DrawerTitle>
          <DrawerDescription className="mt-2 max-w-xs text-sm text-muted-foreground">
            {description}
          </DrawerDescription>

          <div className="mt-6 flex w-full flex-col gap-3">
            <DrawerClose asChild>
              <Button
                type="button"
                size="lg"
                variant="destructive"
                onClick={onConfirm}
                className="h-12 w-full rounded-2xl text-base font-bold"
              >
                {confirmLabel}
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                type="button"
                size="lg"
                variant="secondary"
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
