"use client";

import { useId } from "react";

interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function NewAddressMobileInput({
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
      <input
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12.5 w-full rounded-sm bg-secondary px-4 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
}
