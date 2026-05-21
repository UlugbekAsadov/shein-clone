"use client";

import { usePathname } from "next/navigation";
import {
  HomeAngle,
  Widget,
  Cart3,
  BoxMinimalistic,
  User,
} from "@solar-icons/react";
import { LayoutGroup, AnimatePresence } from "motion/react";
import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { MobileBottomNavItem } from "./mobile-bottom-nav-item";
import { MobileBottomNavPill } from "./mobile-bottom-nav-pill";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

interface IItem {
  key: string;
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
}

export function MobileBottomNav({ lang, dict }: IProps) {
  const pathname = usePathname();
  const homePath = `/${lang}`;
  const categoryPath = `/${lang}/category`;
  const cartPath = `/${lang}/cart`;
  const ordersPath = `/${lang}/orders`;
  const profilePath = `/${lang}/profile`;

  if (pathname.startsWith(`/${lang}/login`)) return null;
  if (pathname.startsWith(`/${lang}/product/`)) return null;
  if (pathname.startsWith(`/${lang}/profile/account`)) return null;
  if (pathname.startsWith(`/${lang}/profile/addresses`)) return null;
  if (pathname.startsWith(`/${lang}/profile/payments`)) return null;
  if (pathname.startsWith(`/${lang}/profile/measurements`)) return null;
  if (pathname.startsWith(`/${lang}/profile/promocode`)) return null;
  if (pathname.startsWith(`/${lang}/profile/notifications`)) return null;
  if (pathname.startsWith(`/${lang}/profile/help-centre`)) return null;
  if (pathname.startsWith(`/${lang}/profile/language`)) return null;
  if (pathname.startsWith(`/${lang}/orders/`)) return null;

  const items: IItem[] = [
    {
      key: "home",
      href: homePath,
      label: dict.mobileNav.home,
      icon: HomeAngle,
    },
    {
      key: "category",
      href: categoryPath,
      label: dict.mobileNav.catalog,
      icon: Widget,
    },
    {
      key: "cart",
      href: cartPath,
      label: dict.mobileNav.cart,
      icon: Cart3,
    },
    {
      key: "orders",
      href: ordersPath,
      label: dict.mobileNav.orders,
      icon: BoxMinimalistic,
    },
    {
      key: "profile",
      href: profilePath,
      label: dict.mobileNav.profile,
      icon: User,
    },
  ];

  const isItemActive = (item: IItem) => {
    if (item.key === "home") return pathname === homePath;
    if (item.key === "profile") return pathname.startsWith(`/${lang}/profile`);
    return pathname.startsWith(item.href);
  };

  const activeIndex = items.findIndex(isItemActive);
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const before = items.slice(0, safeActiveIndex);
  const activeItem = items[safeActiveIndex];
  const after = items.slice(safeActiveIndex + 1);

  return (
    <>
      <div aria-hidden className="h-20 shrink-0 md:hidden" />
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-100 flex justify-center px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] md:hidden"
      >
      <LayoutGroup>
        <div className="pointer-events-auto flex items-center gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            <MobileBottomNavPill
              key="before"
              className={before.length === 0 ? "invisible" : ""}
            >
              {before.map((item) => (
                <MobileBottomNavItem
                  key={item.key}
                  itemKey={item.key}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={false}
                />
              ))}
            </MobileBottomNavPill>
          </AnimatePresence>
          <MobileBottomNavPill key="active" animateInitial={false}>
            <MobileBottomNavItem
              key={activeItem.key}
              itemKey={activeItem.key}
              href={activeItem.href}
              label={activeItem.label}
              icon={activeItem.icon}
              active={true}
            />
          </MobileBottomNavPill>
          <AnimatePresence initial={false} mode="popLayout">
            <MobileBottomNavPill
              key="after"
              className={after.length === 0 ? "invisible" : ""}
            >
              {after.map((item) => (
                <MobileBottomNavItem
                  key={item.key}
                  itemKey={item.key}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={false}
                />
              ))}
            </MobileBottomNavPill>
          </AnimatePresence>
        </div>
      </LayoutGroup>
      </nav>
    </>
  );
}
