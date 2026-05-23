"use client";

import NextTopLoader from "nextjs-toploader";
import { SolarProvider } from "@solar-icons/react";
import { Toaster } from "@/shared/components/ui/sonner";
import { UserProvider } from "@/features/auth/providers/user-provider";
import type { IAuthUser } from "@/features/auth/interfaces/auth.interface";
import Scroll from "@/shared/components/scroll";

interface IProps {
  user: IAuthUser | null;
  children: React.ReactNode;
}

export function Providers({ user, children }: IProps) {
  return (
    <>
      <Scroll />
      <NextTopLoader color="var(--primary)" showSpinner={false} />
      <SolarProvider>
        <UserProvider user={user}>{children}</UserProvider>
      </SolarProvider>
      <Toaster />
    </>
  );
}
