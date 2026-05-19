import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { profileUser } from "@/features/profile/mocks/profile-user.mocks";
import {
  Bell,
  Card,
  ChatRound,
  MapPoint,
  QuestionCircle,
  Ruler,
  Ticket,
  Translation,
  User,
} from "@solar-icons/react/ssr";
import { ProfileMobileHeader } from "./profile-mobile-header";
import { ProfileMobileUserCard } from "./profile-mobile-user-card";
import { ProfileMobileMenuCard } from "./profile-mobile-menu-card";
import { ProfileMobileMenuRow } from "./profile-mobile-menu-row";
import { ProfileMobileToggle } from "./profile-mobile-toggle";
import { ProfileMobileLogout } from "./profile-mobile-logout";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function ProfileMobilePage({ lang, dict }: IProps) {
  const nav = dict.profile.nav;
  const profilePath = `/${lang}/profile`;

  return (
    <div className="pb-6 md:hidden">
      <ProfileMobileHeader title={dict.profile.title} notificationCount={2} />

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
              icon={MapPoint}
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
              icon={ChatRound}
              label={nav.chat}
              href={`${profilePath}/chat`}
            />
            <ProfileMobileMenuRow
              icon={Translation}
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
              icon={QuestionCircle}
              label={nav.helpCentre}
              href={`${profilePath}/help-centre`}
            />
          </ProfileMobileMenuCard>
        </div>

        <div className="px-4">
          <ProfileMobileLogout label={dict.profile.logout} />
        </div>
      </div>
    </div>
  );
}
