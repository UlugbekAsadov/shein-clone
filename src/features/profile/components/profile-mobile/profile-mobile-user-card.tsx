import Image from "next/image";
import type { IProfileUser } from "@/features/profile/interfaces/profile-user.interface";

interface IProps {
  user: IProfileUser;
}

export function ProfileMobileUserCard({ user }: IProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted">
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          sizes="43px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xl font-semibold leading-tight text-foreground">
          {user.name}
        </p>
        <p className="text-base text-muted-foreground">{user.subtitle}</p>
      </div>
    </div>
  );
}
