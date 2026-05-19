import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { MeasurementsForm } from "@/features/profile/components/measurements/measurements-form";
import { MeasurementsMobilePage } from "@/features/profile/components/measurements-mobile/measurements-mobile-page";

export default async function MeasurementsPage({
  params,
}: PageProps<"/[lang]/profile/measurements">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <MeasurementsMobilePage dict={dict} />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="measurements">
            <MeasurementsForm dict={dict} />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
