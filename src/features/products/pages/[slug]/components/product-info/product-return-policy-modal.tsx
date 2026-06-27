"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { XIcon } from "@/shared/components/icons/outline";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductReturnPolicyModal({ open, onOpenChange }: IProps) {
  const t = useDictionary().product.returnPolicy;

  const conditions = [t.condition1, t.condition2, t.condition3];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,900px)]   gap-0 p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogClose className="text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
            <XIcon className="size-6" />
          </DialogClose>
        </div>

        <div className="pt-6 h-[min(92vw,500px)]">
          <h3 className="text-base font-bold text-foreground">
            {t.logisticsTitle}
          </h3>
          <p className="mt-3 text-sm text-foreground">{t.intro}</p>
          <ol className="mt-3 space-y-1 text-sm text-foreground">
            {conditions.map((condition, index) => (
              <li key={condition}>
                {index + 1}. {condition}
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
