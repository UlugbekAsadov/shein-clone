"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AltArrowUp } from "@solar-icons/react";

interface IProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function FilterSection({
  title,
  children,
  defaultOpen = true,
  className,
}: IProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={cn("border-t border-border py-4", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left cursor-pointer"
      >
        <span className="font-bold">{title}</span>
        <AltArrowUp
          className={cn("size-5 transition-transform", !open && "rotate-180")}
        />
      </button>
      {open && <div className="pt-4">{children}</div>}
    </section>
  );
}
