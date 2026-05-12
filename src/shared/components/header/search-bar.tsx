"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  searchCategories,
  searchHistory as initialSearchHistory,
} from "@/shared/mocks";
import type { locales } from "@/core/config/i18n/i18n-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { CameraIcon, SearchIcon } from "../icons/outline";

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
      <div className="relative flex h-12.5 w-full items-stretch rounded-md bg-muted/60 ring-1 ring-border">
        <Select defaultValue={searchCategories[0].id}>
          <SelectTrigger
            className="h-full! rounded-l-full border-0 bg-transparent pl-4 pr-2.25 text-sm font-medium text-foreground shadow-none hover:bg-muted/80 focus:ring-0 border-r"
            aria-label="Category"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start" position="popper" className="rounded-md">
            {searchCategories.map((c) => (
              <SelectItem
                key={c.id}
                value={c.id}
                className="text-lg font-medium text-secondary-foreground py-3 px-3.5"
              >
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex flex-1 items-center pl-2">
          <SearchIcon className="size-6 text-muted-foreground" />
          <input
            type="text"
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            className="flex-1 bg-transparent pl-1.5 pr-10 text-sm placeholder:text-muted-foreground placeholder:font-medium focus:outline-none"
          />
          <button
            type="button"
            aria-label="Visual search"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted"
          >
            <CameraIcon className="size-6" />
          </button>
        </div>

        <button
          type="button"
          className="rounded-r-md bg-foreground px-4 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          {searchLabel}
        </button>
      </div>

      {open && history.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg bg-background shadow-2xl ring-1 ring-border">
          <ul>
            {history.map((item) => (
              <li
                key={item.id}
                className="group flex items-center justify-between px-3.5 py-2.75 hover:bg-muted cursor-pointer"
              >
                <button
                  type="button"
                  onClick={() => goToSearch(item.text)}
                  className="flex-1 text-left text-lg cursor-pointer text-secondary-foreground  font-medium"
                >
                  {item.text}
                </button>
                <button
                  type="button"
                  aria-label="Remove from history"
                  onClick={() => removeItem(item.id)}
                  className="grid size-6 place-items-center rounded-full text-muted-foreground cursor-pointer"
                >
                  <X className="size-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
