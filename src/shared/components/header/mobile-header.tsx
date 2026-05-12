import Link from "next/link";
import { Bell, ChevronDown, Heart, MapPin } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  location?: string;
  notificationCount?: number;
}

export function MobileHeader({
  lang,
  location = "Toshkent",
  notificationCount = 3,
}: IProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur md:hidden">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full px-1.5 py-1 text-sm font-semibold text-foreground"
          aria-label="Select location"
        >
          <MapPin className="size-5" />
          <span>{location}</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-1">
          <Link
            href={`/${lang}/profile/wishlist`}
            aria-label="Wishlist"
            className="grid size-10 place-items-center rounded-full hover:bg-muted"
          >
            <Heart className="size-6 text-foreground" />
          </Link>
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-full hover:bg-muted"
          >
            <Bell className="size-6 text-foreground" />
            {notificationCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
