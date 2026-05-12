import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export function MobileBottomNavItem({ href, label, icon: Icon, active }: IProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium transition-colors",
        active ? "text-foreground" : "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "grid h-7 w-12 place-items-center rounded-full transition-colors",
          active && "bg-foreground text-background",
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className={cn(!active && "sr-only")}>{label}</span>
    </Link>
  );
}
