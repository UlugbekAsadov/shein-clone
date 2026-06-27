"use client";

import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { XIcon } from "@/shared/components/icons/outline";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import { useShippingSteps } from "@/features/products/pages/[slug]/hooks/use-shipping-steps";
import {
  computeDeliveryWindow,
  formatDeliveryWindow,
} from "@/features/products/pages/[slug]/utils/compute-delivery-window";
import { ProductShippingLogistics } from "./product-shipping-logistics";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductShippingModal({ open, onOpenChange }: IProps) {
  const t = useDictionary().product.shippingModal;
  const { lang } = useApiDeps();
  const { data: steps, isPending } = useShippingSteps(open);

  const deliveryLabel = useMemo(() => {
    if (!steps) return null;
    const window = computeDeliveryWindow(steps, new Date());
    if (!window) return null;
    return formatDeliveryWindow(window, lang);
  }, [steps, lang]);

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
          <p className="text-sm text-muted-foreground">
            {t.shippingTo}{" "}
            <span className="font-semibold text-foreground">{t.country}</span>
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <div className="grid grid-cols-2 bg-secondary text-sm font-semibold text-foreground">
              <div className="border-r border-border p-4">{t.shipmentCost}</div>
              <div className="p-4">{t.estDelivery}</div>
            </div>
            <div className="grid grid-cols-2 border-t border-border text-sm">
              <div className="border-r border-border p-4">
                <div className="font-medium text-foreground">
                  {t.standardShipping}
                </div>
                <ul className="mt-1 list-disc pl-5">
                  <li className="font-semibold text-emerald-600">{t.free}</li>
                </ul>
              </div>
              <div className="flex items-center p-4 font-semibold text-foreground">
                {isPending ? (
                  <span className="text-muted-foreground">…</span>
                ) : (
                  (deliveryLabel ?? "—")
                )}
              </div>
            </div>
          </div>
        </div>

        <ProductShippingLogistics />
      </DialogContent>
    </Dialog>
  );
}
