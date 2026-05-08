"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";
import { cn } from "@/lib/utils";

const flagFor: Record<Locale, string> = {
  uz: "🇺🇿",
  en: "🇺🇸",
  ru: "🇷🇺",
};

export function LocaleSwitcher({ current }: { current: Locale }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (target: Locale) => {
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = target;
    router.push(segments.join("/") || `/${target}`);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2 py-1 text-sm font-medium hover:opacity-80"
        aria-expanded={open}
      >
        <Globe className="size-4" />
        <span className="uppercase">{current}</span>
        <ChevronDown className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-32 overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => handleSelect(l)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-muted",
                l === current && "bg-muted/60",
              )}
            >
              <span className="text-base leading-none">{flagFor[l]}</span>
              <span className="uppercase">{l}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
