"use client";

import { useId } from "react";
import { PenNewSquare } from "@solar-icons/react/ssr";

interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AccountTextField({
  label,
  value,
  onChange,
  placeholder,
}: IProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-12.5 w-full rounded-sm bg-secondary px-4 pr-12 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <PenNewSquare
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
