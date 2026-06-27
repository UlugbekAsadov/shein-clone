"use client";

import { XIcon } from "@/shared/components/icons/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { ProductReturnPolicyContent } from "@/features/products/pages/[slug]/components/product-info/product-return-policy-content";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductMobileReturnPolicyDrawer({ open, onOpenChange }: IProps) {
  const dict = useDictionary();
  const t = dict.product.returnPolicy;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-100 max-h-[85vh]">
        <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b bg-popover px-4 py-3">
          <DrawerTitle className="text-base font-bold text-foreground">
            {t.title}
          </DrawerTitle>
          <DrawerClose
            aria-label={dict.common.close}
            className="grid size-8 place-items-center rounded-full bg-secondary text-foreground"
          >
            <XIcon className="size-4" />
          </DrawerClose>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <ProductReturnPolicyContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
