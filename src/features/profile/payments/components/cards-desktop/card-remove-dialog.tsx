"use client";

import { TrashBinTrash } from "@solar-icons/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
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

export function CardRemoveDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
}: IProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center rounded-lg">
        <span className="mx-auto grid size-15.5 place-items-center rounded-full bg-destructive text-background">
          <TrashBinTrash className="size-9" weight="Bold" />
        </span>
        <DialogTitle className="mt-4 text-xl font-bold text-center">{title}</DialogTitle>
        <DialogDescription className="mt-1 text-sm text-center">
          {description}
        </DialogDescription>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-12.5 rounded-sm text-base font-semibold bg-[#DEDEE4] hover:bg-[#DEDEE4]/90"
            >
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleConfirm}
            className="h-12.5 rounded-sm bg-destructive text-base font-semibold text-background hover:bg-destructive/90"
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
