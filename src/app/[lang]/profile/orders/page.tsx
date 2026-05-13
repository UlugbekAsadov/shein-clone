import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { CategoryNav } from "@/shared/components/category/category-nav";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { OrdersList } from "@/features/profile/components/orders/orders-list";
import { orderMocks } from "@/features/profile/mocks/order.mocks";

export default async function OrdersPage({
  params,
}: PageProps<"/[lang]/profile/orders">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <ProfileShell lang={lang} dict={dict} activeId="orders">
          <OrdersList orders={orderMocks} dict={dict} />
        </ProfileShell>
      </main>

      <Footer dict={dict} />
    </>
  );
}
