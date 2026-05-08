"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  const hrefFor = (target: Locale) => {
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
