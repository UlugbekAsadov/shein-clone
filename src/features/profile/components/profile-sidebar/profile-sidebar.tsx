import {
  CircleUserRound,
  Package,
  MapPin,
  CreditCard,
  Ruler,
  Ticket,
} from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProfileNavItem } from "@/features/profile/interfaces/profile-nav-item.interface";
import type { IProfileUser } from "@/features/profile/interfaces/profile-user.interface";
import { ProfileUserCard } from "@/features/profile/components/profile-user-card";
import { ProfileSidebarItem } from "./profile-sidebar-item";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  user: IProfileUser;
  activeId: string;
}

export function ProfileSidebar({ lang, dict, user, activeId }: IProps) {
  const items: IProfileNavItem[] = [
    {
      id: "account",
      label: dict.profile.nav.account,
      href: `/${lang}/profile/account`,
      icon: CircleUserRound,
    },
    {
      id: "orders",
      label: dict.profile.nav.orders,
      href: `/${lang}/profile/orders`,
      icon: Package,
    },
    {
      id: "addresses",
      label: dict.profile.nav.addresses,
      href: `/${lang}/profile/addresses`,
      icon: MapPin,
    },
    {
      id: "payments",
      label: dict.profile.nav.payments,
      href: `/${lang}/profile/payments`,
      icon: CreditCard,
    },
    {
      id: "measurements",
      label: dict.profile.nav.measurements,
      href: `/${lang}/profile/measurements`,
      icon: Ruler,
    },
    {
      id: "promocode",
      label: dict.profile.nav.promocode,
      href: `/${lang}/profile/promocode`,
      icon: Ticket,
    },
  ];

  return (
    <aside className="w-full max-w-[260px] shrink-0 space-y-3">
      <ProfileUserCard user={user} />
      <nav>
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <ProfileSidebarItem item={item} active={item.id === activeId} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
