import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import { MapPointWave, Heart, Bell } from "@solar-icons/react/ssr";

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
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur md:hidden">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <button
          type="button"
          className="flex items-center gap-1 rounded-full font-semibold text-foreground"
          aria-label="Select location"
        >
          <MapPointWave className="size-6" />
          {location}
        </button>

        <div className="flex items-center gap-1">
          <Link
            href={`/${lang}/profile/wishlist`}
            aria-label="Wishlist"
            className="grid size-9 place-items-center rounded-full bg-secondary hover:bg-secondary/80"
          >
            <Heart className="size-6 text-foreground" />
          </Link>
          <Link
            href={`/${lang}/profile/notifications`}
            aria-label="Notifications"
            className="relative grid size-9 place-items-center rounded-full bg-secondary hover:bg-secondary/80"
          >
            <Bell className="size-6 text-foreground" />
            {notificationCount > 0 && (
              <span className="absolute right-0 top-0 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
                {notificationCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
