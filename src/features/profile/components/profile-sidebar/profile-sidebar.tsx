import {
  UserCircle,
  Box,
  MapPoint,
  Card,
  Ruler,
  Ticket,
  ChatRoundDots,
} from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IProfileNavItem } from "@/features/profile/utils/profile-nav-item.interface";
import type { IProfileUser } from "@/features/profile/utils/profile-user.interface";
import { ProfileUserCard } from "@/features/profile/components/profile-user-card";
import { ProfileUserCardSkeleton } from "@/features/profile/components/profile-user-card-skeleton";
import { ProfileSidebarItem } from "./profile-sidebar-item";
import { ProfileSidebarLogout } from "./profile-sidebar-logout";
import { SupportIcon } from "@/shared/components/icons/outline";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  user: IProfileUser;
  activeId: string;
  isUserPending?: boolean;
}

export function ProfileSidebar({
  lang,
  dict,
  user,
  activeId,
  isUserPending,
}: IProps) {
  const items: IProfileNavItem[] = [
    {
      id: "account",
      label: dict.profile.nav.account,
      href: `/${lang}/profile/account`,
      icon: UserCircle,
    },
    {
      id: "orders",
      label: dict.profile.nav.orders,
      href: `/${lang}/profile/orders`,
      icon: Box,
    },
    {
      id: "addresses",
      label: dict.profile.nav.addresses,
      href: `/${lang}/profile/addresses`,
      icon: MapPoint,
    },
    {
      id: "payments",
      label: dict.profile.nav.myCards,
      href: `/${lang}/profile/payments`,
      icon: Card,
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
    {
      id: "chat",
      label: dict.profile.nav.chat,
      href: `/${lang}/profile/chat`,
      icon: ChatRoundDots,
    },
    {
      id: "helpCentre",
      label: dict.profile.nav.helpCentre,
      href: `/${lang}/profile/help-centre`,
      icon: SupportIcon,
    },
  ];

  return (
    <aside className="w-full max-w-[260px] shrink-0 space-y-3">
      {isUserPending ? (
        <ProfileUserCardSkeleton />
      ) : (
        <ProfileUserCard user={user} />
      )}
      <nav>
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <ProfileSidebarItem item={item} active={item.id === activeId} />
            </li>
          ))}
          <li>
            <ProfileSidebarLogout lang={lang} label={dict.profile.logout} />
          </li>
        </ul>
      </nav>
    </aside>
  );
}
