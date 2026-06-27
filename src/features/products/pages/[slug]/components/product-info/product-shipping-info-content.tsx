"use client";

import { useMemo } from "react";
import { useDictionary } from "@/core/config/i18n/use-dictionary";
import { useApiDeps } from "@/shared/hooks/use-api-deps";
import { useShippingSteps } from "@/features/products/pages/[slug]/hooks/use-shipping-steps";
import {
  computeDeliveryWindow,
  formatDeliveryWindow,
} from "@/features/products/pages/[slug]/utils/compute-delivery-window";
import { ProductShippingLogistics } from "./product-shipping-logistics";

export function ProductShippingInfoContent() {
  const t = useDictionary().product.shippingModal;
  const { lang } = useApiDeps();
  const { data: steps, isPending } = useShippingSteps(true);

  const deliveryLabel = useMemo(() => {
    if (!steps) return null;
    const window = computeDeliveryWindow(steps, new Date());
    if (!window) return null;
    return formatDeliveryWindow(window, lang);
  }, [steps, lang]);

  return (
    <div>
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

      <ProductShippingLogistics />
    </div>
  );
}
