import type { INotification } from "@/features/profile/interfaces/notification.interface";
import { NotificationCard } from "./notification-card";

interface IProps {
  notifications: INotification[];
}

export function NotificationsMobileList({ notifications }: IProps) {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
