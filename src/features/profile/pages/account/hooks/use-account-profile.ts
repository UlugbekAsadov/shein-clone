"use client";

import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import type { IAccountProfile } from "@/features/profile/pages/account/utils/account.interface";

export function useAccountProfile(): IAccountProfile {
  const { data: user } = useCurrentUser();

  return {
    name: user?.name ?? user?.first_name ?? "",
    surname: user?.surname ?? user?.last_name ?? "",
    dateOfBirth: user?.birth_date ?? "",
    gender: user?.gender ?? "male",
    avatar: user?.avatar ?? user?.image ?? null,
  };
}
