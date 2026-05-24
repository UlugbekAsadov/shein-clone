import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  label: string;
}

export function ProfileMobileLoginButton({ lang, label }: IProps) {
  return (
    <Link
      href={`/${lang}/login`}
      className="block w-full rounded-full bg-foreground py-4 text-center text-base font-semibold text-background transition-opacity active:opacity-90"
    >
      {label}
    </Link>
  );
}
