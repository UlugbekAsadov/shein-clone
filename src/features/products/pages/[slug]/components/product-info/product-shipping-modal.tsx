"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { XIcon } from "@/shared/components/icons/outline";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { ProductShippingInfoContent } from "./product-shipping-info-content";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductShippingModal({ open, onOpenChange }: IProps) {
  const t = useDictionary().product.shippingModal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,900px)] gap-0 p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogClose className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
            <XIcon className="size-6" />
          </DialogClose>
        </div>

        <div className="pt-5">
          <ProductShippingInfoContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
