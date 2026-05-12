"use client";

import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Tag, User } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { MobileBottomNavItem } from "./mobile-bottom-nav-item";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function MobileBottomNav({ lang, dict }: IProps) {
  const pathname = usePathname();
  const homePath = `/${lang}`;
  const profilePath = `/${lang}/profile/account`;

  const isHome = pathname === homePath;
  const isProfile = pathname.startsWith(`/${lang}/profile`);

  const items = [
    {
      href: homePath,
      label: dict.mobileNav.home,
      icon: Home,
      active: isHome,
    },
    {
      href: "#",
      label: dict.mobileNav.browse,
      icon: LayoutGrid,
      active: false,
    },
    {
      href: "#",
      label: dict.mobileNav.cart,
      icon: ShoppingCart,
      active: false,
    },
    {
      href: "#",
      label: dict.mobileNav.deals,
      icon: Tag,
      active: false,
    },
    {
      href: profilePath,
      label: dict.mobileNav.profile,
      icon: User,
      active: isProfile,
    },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden"
    >
      <div className="flex items-stretch pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => (
          <MobileBottomNavItem
            key={item.label}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={item.active}
          />
        ))}
      </div>
    </nav>
  );
}
