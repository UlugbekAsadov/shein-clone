"use client";

import { useId, useState } from "react";
import { Calendar } from "@solar-icons/react/ssr";

interface IProps {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  placeholder?: string;
}

function isoToDigits(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return "";
  return `${day}${month}${year}`;
}

function formatDigits(digits: string): string {
  const d = digits.slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4)}`;
}

function digitsToIso(digits: string): string {
  return `${digits.slice(4, 8)}-${digits.slice(2, 4)}-${digits.slice(0, 2)}`;
}

export function AccountDobField({
  label,
  value,
  onChange,
  placeholder,
}: IProps) {
  const id = useId();
  const [digits, setDigits] = useState(() => isoToDigits(value));

  const handleChange = (raw: string) => {
    const next = raw.replace(/\D/g, "").slice(0, 8);
    setDigits(next);
    if (next.length === 8) onChange(digitsToIso(next));
    else if (next.length === 0) onChange("");
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          value={formatDigits(digits)}
          onChange={(event) => handleChange(event.target.value)}
          placeholder={placeholder}
          className="h-12.5 w-full rounded-sm bg-secondary px-4 pr-12 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <Calendar
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>
  );
}
