"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Search, X } from "lucide-react";
import {
  searchCategories,
  searchHistory as initialSearchHistory,
} from "@/lib/mock-data";
import type { locales } from "@/lib/i18n-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  lang: (typeof locales)[number];
  placeholder: string;
  searchLabel: string;
}

export function SearchBar({ lang, placeholder, searchLabel }: IProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(initialSearchHistory);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const removeItem = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const goToSearch = (text: string) => {
    setOpen(false);
    router.push(`/${lang}/search?q=${encodeURIComponent(text)}`);
  };

  return (
    <div ref={containerRef} className="relative flex flex-1">
      <div className="relative flex h-12 w-full items-stretch rounded-full bg-muted/60 ring-1 ring-border">
        <Select defaultValue={searchCategories[0].id}>
          <SelectTrigger
            className="h-full! rounded-l-full border-0 bg-transparent pl-5 pr-3 text-sm font-medium text-foreground shadow-none hover:bg-muted/80 focus:ring-0"
            aria-label="Category"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" position="popper">
            {searchCategories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-1 items-center pl-2">
          <Search className="size-6 text-muted-foreground" />
          <input
            type="search"
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            className="flex-1 bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            aria-label="Visual search"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted"
          >
            <Camera className="size-6" />
          </button>
        </div>

        <button
          type="button"
          className="rounded-r-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          {searchLabel}
        </button>
      </div>

      {open && history.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg bg-background shadow-2xl ring-1 ring-border">
          <ul className="py-1">
            {history.map((item) => (
              <li
                key={item.id}
                className="group flex items-center justify-between px-5 hover:bg-muted"
              >
                <button
                  type="button"
                  onClick={() => goToSearch(item.text)}
                  className="flex-1 py-3 text-left text-sm text-foreground cursor-pointer"
                >
                  {item.text}
                </button>
                <button
                  type="button"
                  aria-label="Remove from history"
                  onClick={() => removeItem(item.id)}
                  className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
