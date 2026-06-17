"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchHistory as initialSearchHistory } from "@/shared/mocks";
import type { locales } from "@/core/config/i18n/i18n-config";

import { SearchIcon, XIcon } from "../icons/outline";
import {
  VisualSearch,
  type IVisualSearchDict,
} from "./visual-search/visual-search";

interface IProps {
  lang: (typeof locales)[number];
  placeholder: string;
  searchLabel: string;
  visualSearchDict: IVisualSearchDict;
}

export function SearchBar({
  lang,
  placeholder,
  searchLabel,
  visualSearchDict,
}: IProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState(initialSearchHistory);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState(
    () => searchParams?.get("query") ?? "",
  );

  useEffect(() => {
    setSearchValue(searchParams?.get("query") ?? "");
  }, [searchParams]);

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
    const trimmed = text.trim();
    if (!trimmed) return;
    setOpen(false);
    router.push(`/${lang}/demo/products?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div ref={containerRef} className="relative flex flex-1">
      <div className="relative flex h-12.5 w-full items-stretch rounded-md bg-muted/60 ring-1 ring-border">
        {/* <Select defaultValue={searchCategories[0].id}>
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
        </Select> */}

        <div className="flex flex-1 items-center px-2">
          <SearchIcon className="size-6 text-muted-foreground" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => e.key === "Enter" && goToSearch(searchValue)}
            className="flex-1 bg-transparent pl-1.5 pr-10 text-sm placeholder:text-muted-foreground placeholder:font-medium focus:outline-none"
          />
          {searchValue.length ? (
            <button
              type="button"
              onClick={() => goToSearch(searchValue)}
              className="rounded-sm cursor-pointer bg-foreground px-3 h-9.5 text-sm font-semibold text-background hover:bg-foreground/90"
            >
              {searchLabel}
            </button>
          ) : (
            <VisualSearch lang={lang} dict={visualSearchDict} />
          )}
        </div>
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
                  <XIcon className="size-6" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
