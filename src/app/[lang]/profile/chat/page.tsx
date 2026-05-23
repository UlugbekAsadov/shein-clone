import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { ChatPage } from "@/features/profile/pages/chat/pages/chat.page";

export default async function Page({
  params,
}: PageProps<"/[lang]/profile/chat">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <ChatPage lang={lang} dict={dict} />;
}
