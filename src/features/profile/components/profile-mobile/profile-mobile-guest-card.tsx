import { UserCircle } from "@solar-icons/react/ssr";

interface IProps {
  title: string;
  subtitle: string;
}

export function ProfileMobileGuestCard({ title, subtitle }: IProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-muted text-muted-foreground">
        <UserCircle className="size-12" weight="Bold" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xl font-semibold leading-tight text-foreground">
          {title}
        </p>
        <p className="text-base text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
