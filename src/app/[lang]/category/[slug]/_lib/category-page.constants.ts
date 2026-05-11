import { LayoutGrid, List, Rows3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const productCountMock = 1248;

export const defaultPriceRange: [number, number] = [300, 1000];

export const priceBounds = { min: 0, max: 2000 };

export const viewModes: {
  id: "comfortable" | "compact" | "list";
  icon: LucideIcon;
}[] = [
  { id: "comfortable", icon: LayoutGrid },
  { id: "compact", icon: Rows3 },
  { id: "list", icon: List },
];
