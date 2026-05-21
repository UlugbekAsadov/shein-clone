import type { ReactNode } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { profileUser } from "@/features/profile/mocks/profile-user.mocks";
import { ProfileBreadcrumb } from "./profile-breadcrumb";
import { ProfileSidebar } from "./profile-sidebar/profile-sidebar";

type SectionId =
  | "account"
  | "orders"
  | "addresses"
  | "payments"
  | "measurements"
  | "promocode";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  activeId: SectionId;
  children: ReactNode;
}

export function ProfileShell({ lang, dict, activeId, children }: IProps) {
  const sectionLabel = dict.profile.nav[activeId];

  return (
    <div className="mx-auto max-w-360 space-y-6 px-6 py-6">
      <ProfileBreadcrumb lang={lang} dict={dict} sectionLabel={sectionLabel} />

      <div className="flex flex-col gap-10 md:flex-row">
        <ProfileSidebar
          lang={lang}
          dict={dict}
          user={profileUser}
          activeId={activeId}
        />
        <section className="min-w-0 flex-1">{children}</section>
      </div>
    </div>
  );
}
