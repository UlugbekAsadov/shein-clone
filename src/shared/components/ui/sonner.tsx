"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            "group flex w-full items-center gap-3 rounded-lg text-background shadow-lg px-4 py-3",
          icon: "shrink-0",
          title: "flex-1 text-sm font-semibold",
          closeButton:
            "bg-transparent border-0 text-background opacity-80 hover:opacity-100",
          error: "bg-destructive",
          success: "bg-emerald-500",
        },
      }}
    />
  );
}
