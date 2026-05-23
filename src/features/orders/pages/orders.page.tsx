import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { OrdersList } from "@/features/orders/components/orders/orders-list";
import { OrdersMobilePage } from "@/features/orders/components/orders-mobile/orders-mobile-page";
import { orderMocks } from "@/features/orders/mocks/order.mocks";
import { orderGroupMocks } from "@/features/orders/mocks/order-group.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function OrdersPage({ lang, dict }: IProps) {
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
