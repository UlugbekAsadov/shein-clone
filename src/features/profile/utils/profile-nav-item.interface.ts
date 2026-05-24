import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";

export interface IProfileNavItem {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
}
