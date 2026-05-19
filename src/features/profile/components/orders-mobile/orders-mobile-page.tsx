"use client";

import { useState } from "react";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { IOrderGroup } from "@/features/profile/interfaces/order-group.interface";
import { OrdersMobileHeader } from "./orders-mobile-header";
import { OrdersMobileTabs, type OrdersMobileTabId } from "./orders-mobile-tabs";
import { OrdersMobileList } from "./orders-mobile-list";
import { OrdersMobileEmpty } from "./orders-mobile-empty";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  activeOrders: IOrderGroup[];
  historyOrders: IOrderGroup[];
}

export function OrdersMobilePage({
  lang,
  dict,
  activeOrders,
  historyOrders,
}: IProps) {
  const t = dict.profile.orders;
  const [activeTab, setActiveTab] = useState<OrdersMobileTabId>("active");

  const currentOrders = activeTab === "active" ? activeOrders : historyOrders;
  const isEmpty = currentOrders.length === 0;

  return (
    <div className="pb-6 md:hidden">
      <OrdersMobileHeader
        title={t.title}
        filterTitle={t.statusFilter}
        applyLabel={t.apply}
        statusLabels={{
          unpaid: t.status.unpaid,
          processing: t.status.processing,
          shipped: t.status.shipped,
          review: t.status.review,
          return: t.status.return,
        }}
      />

      <div className="px-4 pt-1 pb-4">
        <OrdersMobileTabs
          active={activeTab}
          onChange={setActiveTab}
          activeLabel={t.activeOrders}
          historyLabel={t.orderHistory}
        />
      </div>

      {isEmpty ? (
        <OrdersMobileEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <OrdersMobileList lang={lang} orders={currentOrders} dict={dict} />
      )}
    </div>
  );
}
