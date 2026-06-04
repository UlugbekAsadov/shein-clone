import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";

export default async function Page({ params }: PageProps<"/[lang]/demo">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen min-w-screen w-full bg-white flex items-center justify-center px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
        {dict.site?.comingSoon}
      </h1>
    </div>
  );
}
