"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/features/auth/hooks/use-user";
import { Button } from "@/shared/components/ui/button";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  helloSignInLabel: string;
  signUpLabel: string;
}

export function HeaderUserAction({
  lang,
  helloSignInLabel,
  signUpLabel,
}: IProps) {
  const { user, isAuthenticated } = useUser();

  if (!isAuthenticated || !user) {
    return (
      <Button asChild size="lg" className="rounded-[18px] px-6 h-12.5">
        <Link href={`/${lang}/login`}>{signUpLabel}</Link>
      </Button>
    );
  }

  const displayName =
    user.first_name?.trim() ||
    user.name?.trim() ||
    user.phone;
  const avatarSrc = user.avatar || "/placeholders/avatar.svg";

  return (
    <Link
      href={`/${lang}/profile/account`}
      className="flex items-center gap-2 rounded-full pl-1 pr-3"
    >
      <Image
        src={avatarSrc}
        alt={displayName}
        width={40}
        height={40}
        className="size-10 rounded-full bg-muted object-cover"
      />
      <span className="hidden text-left leading-tight md:block">
        <span className="block font-semibold">{displayName}</span>
        <span className="block text-xs text-secondary-foreground">
          {helloSignInLabel}
        </span>
      </span>
    </Link>
  );
}
