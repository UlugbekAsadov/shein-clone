import Image from "next/image";
import type { IProfileUser } from "@/features/profile/utils/profile-user.interface";

interface IProps {
  user: IProfileUser;
}

export function ProfileUserCard({ user }: IProps) {
  return (
    <div className="flex items-center gap-3 px-4 pb-3 border-b border-border">
      <Image
        src={user.avatar}
        alt={user.name}
        width={48}
        height={48}
        className="size-12 rounded-full bg-muted object-cover"
      />
      <div className="leading-tight">
        <p className="text-lg font-semibold">{user.name}</p>
        {user.subtitle && (
          <p className="text-sm text-muted-foreground">{user.subtitle}</p>
        )}
      </div>
    </div>
  );
}
