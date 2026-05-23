import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function AddCardField({ label, children, className }: IProps) {
  return (
    <label className={cn("flex flex-col gap-1", className)}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
