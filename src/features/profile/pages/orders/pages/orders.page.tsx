import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Header } from "@/shared/components/header/header";
import { Footer } from "@/shared/components/footer/footer";
import { ProfileShell } from "@/features/profile/components/profile-shell";
import { OrdersList } from "@/features/orders/components/orders/orders-list";
import { OrdersMobilePage } from "@/features/orders/components/orders-mobile/orders-mobile-page";
import { orderMocks } from "@/features/orders/mocks/order.mocks";
import { orderGroupMocks } from "@/features/orders/mocks/order-group.mocks";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

export function ProfileOrdersPage({ lang, dict }: IProps) {
  return (
    <>
      <Header lang={lang} dict={dict} />

      <main className="flex-1">
        <OrdersMobilePage
          dict={dict}
          activeOrders={orderGroupMocks}
          historyOrders={[]}
          lang={lang}
        />

        <div className="hidden md:block">
          <ProfileShell lang={lang} dict={dict} activeId="orders">
            <OrdersList orders={orderMocks} dict={dict} />
          </ProfileShell>
        </div>
      </main>

      <Footer dict={dict} />
    </>
  );
}
