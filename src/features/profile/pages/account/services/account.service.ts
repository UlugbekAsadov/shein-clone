import { cache } from "react";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import type { IAccountProfile } from "@/features/profile/pages/account/utils/account.interface";

export const getAccountProfile = cache(async (): Promise<IAccountProfile> => {
  const user = await getCurrentUser();

  return {
    name: user?.name ?? user?.first_name ?? "",
    surname: user?.surname ?? user?.last_name ?? "",
    dateOfBirth: user?.birth_date ?? "",
    gender: user?.gender ?? "male",
    avatar: user?.avatar ?? user?.image ?? null,
  };
});
