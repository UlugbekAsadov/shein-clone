"use client";

import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { MeasurementsForm } from "@/features/profile/pages/measurements/components/measurements/measurements-form";
import { MeasurementsFormSkeleton } from "@/features/profile/pages/measurements/components/measurements/measurements-form-skeleton";
import { MeasurementsMobilePage } from "@/features/profile/pages/measurements/components/measurements-mobile/measurements-mobile-page";
import { MeasurementsMobileSkeleton } from "@/features/profile/pages/measurements/components/measurements-mobile/measurements-mobile-skeleton";
import { useUserMeasurements } from "@/features/profile/pages/measurements/hooks/use-user-measurements";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function MeasurementsPage({ lang, dict }: IProps) {
  const { data: measurements = null, isPending } = useUserMeasurements();

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        {isPending ? (
          <MeasurementsMobileSkeleton />
        ) : (
          <MeasurementsMobilePage dict={dict} measurements={measurements} />
        )}

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="measurements">
            {isPending ? (
              <MeasurementsFormSkeleton />
            ) : (
              <MeasurementsForm dict={dict} measurements={measurements} />
            )}
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
