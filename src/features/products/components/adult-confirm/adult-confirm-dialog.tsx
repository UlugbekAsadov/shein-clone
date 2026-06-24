"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import type { IAdultDict } from "@/features/products/utils/adult.interface";

interface IProps {
  open: boolean;
  dict: IAdultDict;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function AdultConfirmDialog({
  open,
  dict,
  onOpenChange,
  onConfirm,
}: IProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-[min(92vw,350px)] flex-col items-center gap-0 text-center rounded-[20px]">
        <span className="grid size-16 place-items-center rounded-full bg-[#E83737] border-2 border-[#FFFFFF4D] text- md:text-[20px] font-bold text-white">
          {dict.badge}
        </span>
        <DialogTitle className="mt-3 text-xl font-bold">
          {dict.modalTitle}
        </DialogTitle>
        <DialogDescription className="mt-1.5 text-balance text-secondary-foreground">
          {dict.modalDescription}
        </DialogDescription>
        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="rounded-[12px] bg-[#DEDEE4] hover:bg-[#DEDEE4]/90 text-primary"
            onClick={() => onOpenChange(false)}
          >
            {dict.decline}
          </Button>
          <Button
            size="lg"
            className="rounded-[12px] bg-[#E83737] text-white hover:bg-[#E83737]/90"
            onClick={onConfirm}
          >
            {dict.accept}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
