"use client";

import { useState } from "react";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import type { INotification } from "@/features/profile/pages/notifications/utils/notification.interface";
import { NotificationsMobileHeader } from "./notifications-mobile-header";
import { NotificationsMobileList } from "./notifications-mobile-list";
import { NotificationsMobileEmpty } from "./notifications-mobile-empty";

interface IProps {
  dict: IDictionary;
  initialNotifications: INotification[];
}

export function NotificationsMobilePage({
  dict,
  initialNotifications,
}: IProps) {
  const t = dict.profile.notificationsPage;
  const [notifications, setNotifications] =
    useState<INotification[]>(initialNotifications);

  const handleMarkAll = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true })),
    );
  };

  const isEmpty = notifications.length === 0;

  return (
    <div className="flex min-h-screen flex-col md:hidden">
      <NotificationsMobileHeader
        title={t.title}
        markAllLabel={t.markAllRead}
        onMarkAll={handleMarkAll}
      />

      {isEmpty ? (
        <NotificationsMobileEmpty
          title={t.empty.title}
          description={t.empty.description}
        />
      ) : (
        <div className="pt-2">
          <NotificationsMobileList notifications={notifications} />
        </div>
      )}
    </div>
  );
}
