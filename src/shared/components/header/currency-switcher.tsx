import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { currencies } from "@/shared/constants/currencies.constants";
import { AmericaFlagIcon, RussiaFlagIcon, UzbekistanFlagIcon } from "../icons";

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
  return (
    <Select defaultValue={currencies[0]}>
      <SelectTrigger
        className="h-auto gap-1.5 border-0 bg-transparent px-0 py-1 text-sm font-medium shadow-none hover:opacity-80 focus:ring-0"
        aria-label="Currency"
      >
        <SelectValue className="text-secondary-foreground font-medium" />
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
