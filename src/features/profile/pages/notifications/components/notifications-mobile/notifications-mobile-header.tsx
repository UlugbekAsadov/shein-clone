"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@solar-icons/react";
import { CheckRead } from "@solar-icons/react/ssr";
import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  title: string;
  markAllLabel: string;
  onMarkAll: () => void;
}

export function NotificationsMobileHeader({
  title,
  markAllLabel,
  onMarkAll,
}: IProps) {
  const router = useRouter();
  const dict = useDictionary();

  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={dict.common.goBack}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <h1 className="flex-1 text-center text-lg font-bold text-foreground">
          {title}
        </h1>

        <button
          type="button"
          onClick={onMarkAll}
          aria-label={markAllLabel}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <CheckRead className="size-6" />
        </button>
      </div>
    </div>
  );
}
