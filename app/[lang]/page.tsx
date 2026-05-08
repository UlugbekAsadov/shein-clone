import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "./dictionaries";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold">{dict.home.title}</h1>
      <p className="text-muted-foreground">{dict.home.greeting}</p>
      <LanguageSwitcher current={lang} />
    </main>
  );
}
