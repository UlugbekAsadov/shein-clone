"use client";

import { TrashBinMinimalistic } from "@solar-icons/react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface IProps {
  open: boolean;
  clearing: boolean;
  dict: IDictionary["cart"];
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ClearCartDialog({
  open,
  clearing,
  dict,
  onOpenChange,
  onConfirm,
}: IProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center gap-0 text-center rounded-[20px]">
        <span className="flex size-16 items-center justify-center rounded-full bg-[#E83737] text-white">
          <TrashBinMinimalistic className="size-9" weight="Bold" />
        </span>
        <DialogTitle className="mt-4 text-[20px] font-bold">
          {dict.clearCartTitle}
        </DialogTitle>
        <DialogDescription className="mt-1.5 text-balance">
          {dict.clearCartDescription}
        </DialogDescription>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            disabled={clearing}
            onClick={() => onOpenChange(false)}
            className="bg-[#DEDEE4] hover:bg-[#dedee4df] text-primary h-[50px] rounded-[12px] font-medium"
          >
            {dict.cancel}
          </Button>
          <Button
            type="button"
            size="lg"
            disabled={clearing}
            onClick={onConfirm}
            className="bg-[#E83737] text-white hover:bg-[#E83737]/90 h-[50px] rounded-[12px] font-medium"
          >
            {dict.clearCart}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
