import { notFound } from "next/navigation";
import { hasLocale } from "@/core/config/i18n/i18n-config";
import { getDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { OrdersList } from "@/features/profile/components/orders/orders-list";
import { OrdersMobilePage } from "@/features/profile/components/orders-mobile/orders-mobile-page";
import { orderMocks } from "@/features/profile/mocks/order.mocks";
import { orderGroupMocks } from "@/features/profile/mocks/order-group.mocks";

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
        <OrdersMobilePage
          lang={lang}
          dict={dict}
          activeOrders={orderGroupMocks}
          historyOrders={[]}
        />

        <div className="hidden md:block">
          <div className="mx-auto max-w-360 px-6 py-6">
            <OrdersList orders={orderMocks} dict={dict} />
          </div>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
