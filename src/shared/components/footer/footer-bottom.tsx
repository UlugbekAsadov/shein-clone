import { MapPointWave } from "@solar-icons/react/ssr";
import type { IDictionary } from "@/core/config/i18n/dictionaries";

interface IProps {
  dict: IDictionary;
}

export function FooterBottom({ dict }: IProps) {
  const f = dict.footer;

  return (
    <div className="border-t border-[#DEDEE4]">
      <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-4 px-6 py-5 md:flex-row">
        <div className="flex items-center gap-2 text-sm text-secondary-foreground">
          <MapPointWave className="size-6 text-[#020106]" />
          <span>{f.locationLabel}</span>
          <a href="#" className="font-medium text-foreground underline">
            {f.country}
          </a>
        </div>
        <p className="text-lg text-foreground">
          {f.copyrightLabel} {f.rights}
        </p>
      </div>
    </div>
  );
}
