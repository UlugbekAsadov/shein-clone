import { IconProps } from "@solar-icons/react";
import type { LucideIcon } from "lucide-react";
import { JSX } from "react";

export interface IProfileNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon | ((props: IconProps) => JSX.Element);
}
