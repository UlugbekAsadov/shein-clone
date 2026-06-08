"use client";

import { InfoCircle, CheckCircle } from "@solar-icons/react";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      duration={4000}
      visibleToasts={1}
      icons={{
        error: (
          <div className="min-w-9! h-9! mr-3 flex items-center justify-center rounded-[8px] bg-[#040A141F]">
            <InfoCircle weight="Linear" className="size-6 text-white" />
          </div>
        ),
        success: (
          <div className="min-w-9! h-9! mr-3 flex items-center justify-center rounded-[8px] bg-[#040A141F]">
            <CheckCircle weight="Linear" className="size-6 text-white" />
          </div>
        ),
      }}
      closeButton={false}
      toastOptions={{
        classNames: {
          toast:
            "group !relative flex w-full items-start gap-3 !rounded-md shadow-lg !border-0 !p-4",
          icon: "shrink-0 [&_svg]:size-6",
          content: "flex-1",
          title: "text-xs font-medium leading-snug !text-white ml-5",
          closeButton:
            "!static !left-auto !top-auto !right-auto !transform-none !ml-auto !size-6 !bg-transparent !border-0 !text-background !opacity-90 hover:!opacity-100 !shadow-none [&_svg]:!size-4",
          error: "!bg-destructive",
          success: "!bg-emerald-500",
        },
      }}
    />
  );
}
