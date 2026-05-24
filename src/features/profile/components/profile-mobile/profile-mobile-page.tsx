import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IAuthUser } from "@/features/auth/utils/auth.interface";
import { ProfileMobileHeader } from "./profile-mobile-header";
import { ProfileMobileAuthedView } from "./profile-mobile-authed-view";
import { ProfileMobileGuestView } from "./profile-mobile-guest-view";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  user: IAuthUser | null;
}

export function ProfileMobilePage({ lang, dict, user }: IProps) {
  return (
    <div className="pb-6 md:hidden">
      <ProfileMobileHeader
        lang={lang}
        title={dict.profile.title}
        notificationCount={user ? 2 : 0}
      />

      {user ? (
        <ProfileMobileAuthedView lang={lang} dict={dict} />
      ) : (
        <ProfileMobileGuestView lang={lang} dict={dict} />
      )}
    </div>
  );
}
