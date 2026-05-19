import { Bell } from "@solar-icons/react/ssr";

interface IProps {
  title: string;
  notificationCount?: number;
}

export function ProfileMobileHeader({
  title,
  notificationCount = 0,
}: IProps) {
  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>

        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <Bell className="size-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
