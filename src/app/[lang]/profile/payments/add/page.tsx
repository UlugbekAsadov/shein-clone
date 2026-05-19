import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { AddCardMobilePage } from "@/features/profile/components/cards-mobile/add-card/add-card-mobile-page";

export default async function AddCardPage({
  params,
}: PageProps<"/[lang]/profile/payments/add">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="flex-1">
      <AddCardMobilePage lang={lang} dict={dict} />
    </main>
  );
}
