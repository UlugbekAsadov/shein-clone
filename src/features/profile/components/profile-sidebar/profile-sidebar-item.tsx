import Link from "next/link";
import { cn } from "@/lib/utils";
import type { IProfileNavItem } from "@/features/profile/utils/profile-nav-item.interface";

interface IProps {
  item: IProfileNavItem;
  active: boolean;
}

export function ProfileSidebarItem({ item, active }: IProps) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
        active
          ? "bg-foreground text-background fill-background"
          : "text-secondary-foreground hover:bg-muted fill-secondary-foreground",
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}
