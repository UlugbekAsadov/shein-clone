"use client";

import { useDictionary } from "@/core/config/i18n/use-dictionary";

export function ProductShippingLogistics() {
  const t = useDictionary().product.shippingModal;

  return (
    <div className="pt-5">
      <h3 className="text-base font-bold text-foreground">
        {t.logisticsTitle}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{t.logisticsText}</p>
    </div>
  );
}
