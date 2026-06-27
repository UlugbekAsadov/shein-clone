"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { XIcon } from "@/shared/components/icons/outline";
import { ProductReturnPolicyContent } from "./product-return-policy-content";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductReturnPolicyModal({ open, onOpenChange }: IProps) {
  const t = useDictionary().product.returnPolicy;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,900px)] gap-0 p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogClose className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground">
            <XIcon className="size-6" />
          </DialogClose>
        </div>

        <div className="pt-6">
          <ProductReturnPolicyContent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
