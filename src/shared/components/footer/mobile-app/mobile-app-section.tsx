import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { SocialLinks } from "../social-links/social-links";
import { QrCode } from "./qr-code";
import { AppStoreIcon, GooglePlayIcon } from "../../icons/solid";

interface IProps {
  dict: IDictionary;
}

export function MobileAppSection({ dict }: IProps) {
  const f = dict.footer;

  return (
    <div>
      <h4 className="mb-3 text-sm font-bold tracking-wider text-foreground">
        {f.mobileApp}
      </h4>
      <p className="mb-3 text-sm">{f.downloadApp}</p>
      <div className="flex items-start gap-3">
        <QrCode />
        <div className="flex flex-col gap-2">
          <a
            href="#"
            className="flex h-13.5 w-40.25 items-center justify-center gap-2 rounded-[8px] border border-[#DEDEE4] bg-white px-2.5 text-foreground transition-colors hover:bg-secondary"
          >
            <GooglePlayIcon />
          </a>
          <a
            href="#"
            className="flex h-13.5 w-40.25 items-center justify-center gap-2 rounded-[8px] border border-[#DEDEE4] bg-white px-2.5 text-foreground transition-colors hover:bg-secondary"
          >
            <AppStoreIcon />
          </a>
        </div>
      </div>

      <h4 className="mt-6 mb-3 text-sm font-bold tracking-wider text-foreground">
        {f.followUs}
      </h4>
      <SocialLinks />
    </div>
  );
}
