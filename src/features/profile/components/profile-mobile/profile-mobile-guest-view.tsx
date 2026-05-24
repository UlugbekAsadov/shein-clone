import { Bell } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { LanguageIcon, SupportIcon } from "@/shared/components/icons/outline";
import { ProfileMobileGuestCard } from "./profile-mobile-guest-card";
import { ProfileMobileMenuCard } from "./profile-mobile-menu-card";
import { ProfileMobileMenuRow } from "./profile-mobile-menu-row";
import { ProfileMobileToggle } from "./profile-mobile-toggle";
import { ProfileMobileLoginButton } from "./profile-mobile-login-button";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function ProfileMobileGuestView({ lang, dict }: IProps) {
  const nav = dict.profile.nav;
  const guest = dict.profile.guest;
  const profilePath = `/${lang}/profile`;

  return (
    <div className="mt-2 flex flex-col gap-6">
      <ProfileMobileGuestCard title={guest.title} subtitle={guest.subtitle} />

      <div className="px-4">
        <ProfileMobileMenuCard>
          <ProfileMobileMenuRow
            icon={LanguageIcon}
            label={nav.language}
            href={`${profilePath}/language`}
          />
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
        </ProfileMobileMenuCard>
      </div>

      <div className="px-4">
        <ProfileMobileLoginButton lang={lang} label={guest.loginButton} />
      </div>
    </div>
  );
}
