import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { MeasurementsForm } from "@/features/profile/pages/measurements/components/measurements/measurements-form";
import { MeasurementsMobilePage } from "@/features/profile/pages/measurements/components/measurements-mobile/measurements-mobile-page";
import { getUserMeasurements } from "@/features/profile/pages/measurements/services/measurement.service";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export async function MeasurementsPage({ lang, dict }: IProps) {
  const measurements = await getUserMeasurements();

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <MeasurementsMobilePage dict={dict} measurements={measurements} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="measurements">
            <MeasurementsForm dict={dict} measurements={measurements} />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
