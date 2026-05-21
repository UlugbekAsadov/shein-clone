"use client";

import { SolarProvider } from "@solar-icons/react";
import { Toaster } from "@/shared/components/ui/sonner";
import { UserProvider } from "@/features/auth/providers/user-provider";
import type { IAuthUser } from "@/features/auth/interfaces/auth.interface";

interface IProps {
  user: IAuthUser | null;
  children: React.ReactNode;
}

export function Providers({ user, children }: IProps) {
  return (
    <>
      <SolarProvider>
        <UserProvider user={user}>{children}</UserProvider>
      </SolarProvider>
      <Toaster />
    </>
  );
}
