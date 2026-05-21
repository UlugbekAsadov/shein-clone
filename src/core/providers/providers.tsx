"use client";

import { SolarProvider } from "@solar-icons/react";
import { Toaster } from "@/shared/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SolarProvider>{children}</SolarProvider>
      <Toaster />
    </>
  );
}
