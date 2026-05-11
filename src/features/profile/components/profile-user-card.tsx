import Image from "next/image";
import type { IProfileUser } from "@/features/profile/interfaces/profile-user.interface";

interface IProps {
  user: IProfileUser;
}

export function ProfileUserCard({ user }: IProps) {
  return (
    <div className="flex items-center gap-3 px-4 pb-4">
      <Image
        src={user.avatar}
        alt={user.name}
        width={48}
        height={48}
        className="size-12 rounded-full bg-muted object-cover"
      />
      <div className="leading-tight">
        <p className="text-base font-semibold">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.subtitle}</p>
      </div>
    </div>
  );
}
