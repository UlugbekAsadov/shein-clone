import {
  Grid2x2Solid,
  Grid3x3Solid,
  IconProps,
  ViewListSolid,
} from "../components/icons/outline";
import { JSX } from "react";

export const productCountMock = 1248;

export const defaultPriceRange: [number, number] = [300, 1000];

export const priceBounds = { min: 0, max: 2000 };

export const viewModes: {
  id: "comfortable" | "compact" | "list";
  icon: (props: IconProps) => JSX.Element;
}[] = [
  { id: "comfortable", icon: Grid2x2Solid },
  { id: "compact", icon: Grid3x3Solid },
  { id: "list", icon: ViewListSolid },
];
