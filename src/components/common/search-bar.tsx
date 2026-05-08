"use client";

import { useState } from "react";
import { Camera, ChevronDown, Search, X } from "lucide-react";
import { searchCategories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Props = {
  placeholder: string;
  searchLabel: string;
};

export function SearchBar({ placeholder, searchLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(searchCategories[0]);

  return (
    <div className="relative flex h-12 flex-1 items-stretch rounded-full bg-muted/60 ring-1 ring-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-l-full pl-5 pr-3 text-sm font-medium text-foreground hover:bg-muted/80"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {selected.name}
        <ChevronDown className="size-4" />
      </button>

      <div className="flex flex-1 items-center pl-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          type="search"
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          aria-label="Visual search"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted"
        >
          <Camera className="size-5" />
        </button>
      </div>

      <button
        type="button"
        className="my-1 mr-1 rounded-full bg-foreground px-7 text-sm font-semibold text-background hover:bg-foreground/90"
      >
        {searchLabel}
      </button>

      {open && (
        <div
          className="absolute left-0 top-[calc(100%+4px)] z-30 w-[360px] overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
          role="listbox"
        >
          {searchCategories.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
              className={cn(
                "group flex w-full items-center justify-between px-5 py-3 text-left text-sm hover:bg-muted",
                selected.id === c.id && "bg-muted/60",
              )}
              role="option"
              aria-selected={selected.id === c.id}
            >
              <span className={cn("text-foreground", idx === 0 && "font-medium")}>
                {c.name}
              </span>
              {idx > 0 && (
                <X className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
