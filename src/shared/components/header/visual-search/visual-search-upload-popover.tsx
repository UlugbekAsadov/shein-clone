"use client";

import { useEffect, useRef, type RefObject } from "react";
import { GalleryDownload } from "@solar-icons/react/ssr";
import { XIcon } from "@/shared/components/icons/outline";
import type { IVisualSearchDict } from "./visual-search";

interface IProps {
  anchorRef: RefObject<HTMLDivElement | null>;
  dict: IVisualSearchDict;
  onClose: () => void;
  onSelectFile: (file: File) => void;
}

const ACCEPT = "image/jpeg,image/png,image/webp,image/bmp,image/gif";

export function VisualSearchUploadPopover({
  anchorRef,
  dict,
  onClose,
  onSelectFile,
}: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [anchorRef, onClose]);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelectFile(file);
  };

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label={dict.title}
      className="absolute right-0 top-full z-50 mt-3 w-90 rounded-md bg-background p-4 shadow-2xl ring-1 ring-border"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-foreground">{dict.title}</h3>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="grid size-6 place-items-center rounded-full text-muted-foreground cursor-pointer"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border bg-muted/40 px-6 py-10">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-[10px] bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-foreground/90 cursor-pointer"
        >
          {dict.upload}
          <GalleryDownload className="size-5 rotate-180" />
        </button>
        <p className="text-center text-sm text-muted-foreground leading-relaxed">
          {dict.formats}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={onPick}
        className="hidden"
      />
    </div>
  );
}
