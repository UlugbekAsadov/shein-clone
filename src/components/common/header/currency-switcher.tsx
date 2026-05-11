import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSignIcon } from "lucide-react";

const currencies = ["USD", "UZS", "RUB", "EUR"] as const;

export function CurrencySwitcher() {
  return (
    <Select defaultValue={currencies[0]}>
      <SelectTrigger
        className="h-auto gap-1.5 border-0 bg-transparent px-2 py-1 text-sm font-medium shadow-none hover:opacity-80 focus:ring-0"
        aria-label="Currency"
      >
        <DollarSignIcon className="size-6 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="start" position="popper">
        {currencies.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
