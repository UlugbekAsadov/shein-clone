"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { ProductShippingRow } from "./product-shipping-row";
import { ProductReturnPolicyModal } from "./product-return-policy-modal";
import { ProductShippingModal } from "./product-shipping-modal";
import { TruckIconSolid } from "@/shared/components/icons/solid";
import { DollarMinimalistic, ShieldCheck, Shop } from "@solar-icons/react/ssr";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IShippingHighlight {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  onClick?: () => void;
}

export function ProductShippingInfo() {
  const dict = useDictionary();
  const t = dict.product.shippingHighlights;
  const [returnPolicyOpen, setReturnPolicyOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const highlights: IShippingHighlight[] = [
    {
      id: "freeShipping",
      title: t.freeShippingTitle,
      description: t.freeShippingDescription,
      icon: <TruckIconSolid className="size-6 fill-emerald-600" />,
      onClick: () => setShippingOpen(true),
    },
    {
      id: "freeReturns",
      title: t.freeReturnsTitle,
      description: t.freeReturnsDescription,
      icon: (
        <DollarMinimalistic className="size-6 text-foreground" weight="Bold" />
      ),
      onClick: () => setReturnPolicyOpen(true),
    },
    {
      id: "security",
      title: t.securityTitle,
      description: t.securityDescription,
      icon: <ShieldCheck className="size-6 text-foreground" weight="Bold" />,
    },
    {
      id: "soldBy",
      title: t.soldByTitle,
      description: t.soldByDescription,
      icon: <Shop className="size-6 text-foreground" weight="Bold" />,
    },
  ];

  return (
    <div className="rounded-[12px] bg-secondary p-5 space-y-4">
      {highlights.map((highlight) => (
        <ProductShippingRow
          key={highlight.id}
          icon={highlight.icon}
          onClick={highlight.onClick}
        >
          <div className="font-semibold text-foreground text-xs">
            {highlight.title}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {highlight.description}
          </div>
        </ProductShippingRow>
      ))}

      <ProductShippingModal
        open={shippingOpen}
        onOpenChange={setShippingOpen}
      />

      <ProductReturnPolicyModal
        open={returnPolicyOpen}
        onOpenChange={setReturnPolicyOpen}
      />
    </div>
  );
}
