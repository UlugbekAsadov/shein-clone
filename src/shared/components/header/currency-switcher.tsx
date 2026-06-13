"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { currencies } from "@/shared/constants/currencies.constants";
import {
  AmericaFlagIcon,
  RussiaFlagIcon,
  UzbekistanFlagIcon,
} from "../icons/outline";
import { DollarMinimalistic } from "@solar-icons/react";
import { useCurrency } from "@/shared/hooks/use-currency";

function getFlagIcon(locale: (typeof currencies)[number]) {
  switch (locale) {
    case "UZS":
      return <UzbekistanFlagIcon className="size-5.25" />;
    case "RUB":
      return <RussiaFlagIcon className="size-5.25" />;
    case "USD":
      return <AmericaFlagIcon className="size-5.25" />;
  }
}

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select
      value={currency}
      onValueChange={(v) => setCurrency(v as (typeof currencies)[number])}
    >
      <SelectTrigger
        className="h-auto gap-1.5 border-0 bg-transparent px-0 py-1 text-sm font-medium shadow-none hover:opacity-80 focus:ring-0 cursor-pointer"
        aria-label="Currency"
      >
        <DollarMinimalistic className="size-5.25 text-secondary-foreground" />
        <SelectValue className="text-secondary-foreground font-medium uppercase">
          {currency}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="start" position="popper" className="rounded-md">
        {currencies.map((c) => (
          <SelectItem key={c} value={c}>
            {getFlagIcon(c as (typeof currencies)[number])}
            <span className="text-secondary-foreground">{c}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
