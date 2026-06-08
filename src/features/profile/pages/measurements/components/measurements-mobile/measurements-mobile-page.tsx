import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IMeasurements } from "@/features/profile/pages/measurements/utils/measurement.interface";
import { MeasurementsMobileHeader } from "./measurements-mobile-header";
import { MeasurementsMobileList } from "./measurements-mobile-list";

interface IProps {
  dict: IDictionary;
  measurements: IMeasurements | null;
}

export function MeasurementsMobilePage({ dict, measurements }: IProps) {
  const t = dict.profile.measurements;

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <MeasurementsMobileHeader title={t.title} />
      <div className="pt-2">
        <MeasurementsMobileList dict={dict} measurements={measurements} />
      </div>
    </div>
  );
}
