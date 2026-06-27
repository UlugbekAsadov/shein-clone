"use client";

import { useDictionary } from "@/core/config/i18n/use-dictionary";

export function ProductReturnPolicyContent() {
  const t = useDictionary().product.returnPolicy;

  const conditions = [t.condition1, t.condition2, t.condition3];

  return (
    <div>
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
  );
}
