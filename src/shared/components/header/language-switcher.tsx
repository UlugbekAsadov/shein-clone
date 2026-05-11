"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales } from "@/core/config/i18n/i18n-config";
import { cn } from "@/lib/utils";

interface IProps {
  current: (typeof locales)[number];
}

export function LanguageSwitcher({ current }: IProps) {
  const pathname = usePathname();

  const hrefFor = (target: (typeof locales)[number]) => {
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = target;
    return segments.join("/") || `/${target}`;
  };

  return (
    <nav className="flex gap-3 text-sm" aria-label="Language">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          hrefLang={l}
          aria-current={l === current ? "true" : undefined}
          className={cn(
            "uppercase tracking-wide",
            l === current
              ? "font-semibold underline underline-offset-4"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}
