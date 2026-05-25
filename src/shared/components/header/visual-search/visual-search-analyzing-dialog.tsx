"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { XIcon } from "@/shared/components/icons/outline";
import { CornerFrame } from "./corner-frame";

interface IProps {
  open: boolean;
  imageUrl: string | null;
  title: string;
  onClose: () => void;
}

export function VisualSearchAnalyzingDialog({
  open,
  imageUrl,
  title,
  onClose,
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

        <div className="grid place-items-center border-2 border-dashed rounded-xl bg-muted/50 px-6 py-8">
          <div className="relative overflow-hidden rounded-lg">
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt=""
                className="block max-h-80 w-auto object-contain"
              />
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 animate-[visual-scan_1.6s_ease-in-out_infinite] bg-gradient-to-b from-cyan-400/10 via-cyan-400/40 to-cyan-400/10 mix-blend-screen"
            />
            <CornerFrame color="cyan" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
