import { Bell } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";
import { NotificationsMobilePage } from "@/features/profile/pages/notifications/components/notifications-mobile/notifications-mobile-page";
import { notificationMocks } from "@/features/profile/pages/notifications/mocks/notification.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function NotificationsPage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <NotificationsMobilePage
          dict={dict}
          initialNotifications={notificationMocks}
        />

        <div className="hidden md:block">
          <PagePlaceholder
            icon={Bell}
            title={dict.profile.nav.notifications}
            description={dict.profile.nav.notifications}
          />
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
