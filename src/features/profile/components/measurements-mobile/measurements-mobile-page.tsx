import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { MeasurementsMobileHeader } from "./measurements-mobile-header";
import { MeasurementsMobileList } from "./measurements-mobile-list";

interface IProps {
  dict: IDictionary;
}

export function MeasurementsMobilePage({ dict }: IProps) {
  const t = dict.profile.measurements;

  return (
    <div className="flex min-h-dvh flex-col md:hidden">
      <MeasurementsMobileHeader title={t.title} />
      <div className="pt-2">
        <MeasurementsMobileList dict={dict} />
      </div>
    </div>
  );
}
