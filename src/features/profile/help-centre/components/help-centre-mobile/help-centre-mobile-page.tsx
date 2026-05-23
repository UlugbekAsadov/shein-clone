import { Phone } from "@solar-icons/react/ssr";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { TelegramIcon } from "@/shared/components/footer/social-links/icons/telegram-icon";
import { HelpCentreMobileHeader } from "./help-centre-mobile-header";
import { HelpCentreRow } from "./help-centre-row";

interface IProps {
  dict: IDictionary;
}

export function HelpCentreMobilePage({ dict }: IProps) {
  const t = dict.profile.helpCentrePage;

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <HelpCentreMobileHeader title={t.title} />

      <div className="flex flex-col gap-3 px-4 pt-2">
        <HelpCentreRow
          icon={<Phone weight="Bold" className="size-6 text-emerald-500" />}
          label={t.contact.label}
          value={t.contact.value}
          href={`tel:${t.contact.tel}`}
        />
        <HelpCentreRow
          icon={
            <span className="grid size-8 place-items-center rounded-full bg-[#229ED9] text-white">
              <TelegramIcon className="size-4" />
            </span>
          }
          label={t.telegram.label}
          value={t.telegram.value}
          href={t.telegram.url}
          external
        />
      </div>
    </div>
  );
}
