import { notFound } from "next/navigation";
import { BoxMinimalistic } from "@solar-icons/react/ssr";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { PagePlaceholder } from "@/shared/components/page-placeholder/page-placeholder";

export default async function OrdersPage({
  params,
}: PageProps<"/[lang]/orders">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <PagePlaceholder
          icon={BoxMinimalistic}
          title={dict.pagePlaceholder.ordersTitle}
          description={dict.pagePlaceholder.ordersDescription}
        />
      </main>

      <Footer dict={dict} />
    </>
  );
}
