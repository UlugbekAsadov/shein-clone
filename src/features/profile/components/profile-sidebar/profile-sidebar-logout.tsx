"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Logout } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/features/auth/services/auth.actions";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  label: string;
}

export function ProfileSidebarLogout({ lang, label }: IProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await logoutAction();
      router.push(`/${lang}`);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors cursor-pointer",
        "text-rose-500 hover:bg-muted disabled:opacity-50",
      )}
    >
      <Logout className="size-5 shrink-0 -scale-x-100" />
      <span>{label}</span>
    </button>
  );
}
