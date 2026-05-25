"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { XIcon } from "@/shared/components/icons/outline";
import { CornerFrame } from "./corner-frame";

interface IProps {
  open: boolean;
  imageUrl: string | null;
  title: string;
  findLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function VisualSearchCropDialog({
  open,
  imageUrl,
  title,
  findLabel,
  onClose,
  onConfirm,
}: IProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="w-[min(92vw,560px)] gap-5 rounded-[20px] p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-6 place-items-center rounded-full text-muted-foreground cursor-pointer"
          >
            <XIcon className="size-6" />
          </button>
        </div>

        <div className="grid place-items-center border-2 border-dashed rounded-md bg-muted/50 px-6 py-8">
          <div className="relative">
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt=""
                className="block max-h-80 w-auto rounded-lg object-contain"
              />
            )}
            <CornerFrame color="white" />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-[10px] bg-foreground px-5 h-12 text-sm font-semibold text-background hover:bg-foreground/90 cursor-pointer"
          >
            {findLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
