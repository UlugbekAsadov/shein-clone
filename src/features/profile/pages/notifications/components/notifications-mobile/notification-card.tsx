import { CheckCircle, CheckRead } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import type { INotification } from "@/features/profile/pages/notifications/utils/notification.interface";

interface IProps {
  notification: INotification;
}

export function NotificationCard({ notification }: IProps) {
  const { date, time, title, description, read } = notification;

  return (
    <article className="overflow-hidden rounded-sm bg-secondary">
      <header
        className={cn(
          "flex items-center justify-between px-3 py-1.5",
          read
            ? "bg-[#CACAD0] text-foreground"
            : "bg-foreground text-background",
        )}
      >
        <span className="flex items-center gap-1 text-xs font-medium">
          <span>{date}</span>
          <span aria-hidden className="text-current/50">
            •
          </span>
          <span>{time}</span>
        </span>
        {read ? <CheckRead className="size-5" weight="Outline" /> : <CheckCircle className="size-5" weight="Outline" />}
      </header>

      <div className="p-3">
        <h3 className="text-xs font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}
