import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { profileUser } from "@/features/profile/mocks/profile-user.mocks";
import {
  Bell,
  Card,
  Dialog,
  MapPointWave,
  Ruler,
  Ticket,
  User,
} from "@solar-icons/react/ssr";
import { ProfileMobileHeader } from "./profile-mobile-header";
import { ProfileMobileUserCard } from "./profile-mobile-user-card";
import { ProfileMobileMenuCard } from "./profile-mobile-menu-card";
import { ProfileMobileMenuRow } from "./profile-mobile-menu-row";
import { ProfileMobileToggle } from "./profile-mobile-toggle";
import { ProfileMobileLogout } from "./profile-mobile-logout";
import { LanguageIcon, SupportIcon } from "@/shared/components/icons/outline";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function ProfileMobilePage({ lang, dict }: IProps) {
  const nav = dict.profile.nav;
  const profilePath = `/${lang}/profile`;

  return (
    <div className="pb-6 md:hidden">
      <ProfileMobileHeader
        lang={lang}
        title={dict.profile.title}
        notificationCount={2}
      />

      <div className="mt-2 flex flex-col gap-4">
        <ProfileMobileUserCard user={profileUser} />

        <div className="px-4">
          <ProfileMobileMenuCard>
            <ProfileMobileMenuRow
              icon={User}
              label={nav.account}
              href={`${profilePath}/account`}
            />
            <ProfileMobileMenuRow
              icon={MapPointWave}
              label={nav.addresses}
              href={`${profilePath}/addresses`}
            />
            <ProfileMobileMenuRow
              icon={Card}
              label={nav.myCards}
              href={`${profilePath}/payments`}
            />
            <ProfileMobileMenuRow
              icon={Ruler}
              label={nav.measurements}
              href={`${profilePath}/measurements`}
            />
            <ProfileMobileMenuRow
              icon={Ticket}
              label={nav.promocode}
              href={`${profilePath}/promocode`}
            />
            <ProfileMobileMenuRow
              icon={Dialog}
              label={nav.chat}
              href={`${profilePath}/chat`}
            />
            <ProfileMobileMenuRow
              icon={LanguageIcon}
              label={nav.language}
              href={`${profilePath}/language`}
            />
          </ProfileMobileMenuCard>
        </div>

        <div className="px-4">
          <ProfileMobileMenuCard>
            <ProfileMobileMenuRow
              icon={Bell}
              label={nav.notifications}
              trailing={<ProfileMobileToggle active={false} />}
            />
            <ProfileMobileMenuRow
              icon={SupportIcon}
              label={nav.helpCentre}
              href={`${profilePath}/help-centre`}
            />
            <ProfileMobileLogout label={dict.profile.logout} />
          </ProfileMobileMenuCard>
        </div>
      </div>
    </div>
  );
}
