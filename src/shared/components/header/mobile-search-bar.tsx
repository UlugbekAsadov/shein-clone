"use client";

import { useRouter } from "next/navigation";
import type { locales } from "@/core/config/i18n/i18n-config";
import { SearchIcon } from "../icons/outline";
import { Camera } from "@solar-icons/react/ssr";

interface IProps {
  lang: (typeof locales)[number];
  placeholder: string;
}

export function MobileSearchBar({ lang, placeholder }: IProps) {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = String(data.get("q") ?? "").trim();
    if (!q) return;
    router.push(`/${lang}/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={onSubmit} className="md:hidden px-4 mb-3" role="search">
      <div className="relative flex h-11 items-center gap-2 rounded-[14px] bg-muted px-3 py-1">
        <SearchIcon className="size-6 text-muted-foreground" />
        <input
          name="q"
          type="search"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          aria-label="Visual search"
          className="grid size-8 place-items-center rounded-full text-muted-foreground"
        >
          <Camera className="size-6" />
        </button>
      </div>
    </form>
  );
}
