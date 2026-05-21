"use client";

import { User } from "@solar-icons/react/ssr";
import { cn } from "@/lib/utils";
import type { IGender } from "@/features/auth/interfaces/register.interface";

interface IProps {
  value: IGender | null;
  onChange: (value: IGender) => void;
  labels: {
    male: string;
    female: string;
  };
}

const OPTIONS: ReadonlyArray<{ value: IGender; labelKey: "male" | "female" }> = [
  { value: "male", labelKey: "male" },
  { value: "female", labelKey: "female" },
];

export function LoginGenderToggle({ value, onChange, labels }: IProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {OPTIONS.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex h-13 items-center justify-between rounded-sm border px-4 transition-colors",
              selected
                ? "border-foreground bg-background"
                : "border-transparent bg-secondary",
            )}
          >
            <span className="flex items-center gap-2">
              <User
                weight="Bold"
                className={cn(
                  "size-5",
                  selected ? "text-foreground" : "text-muted-foreground",
                )}
              />
              <span
                className={cn(
                  "text-base font-medium",
                  selected ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {labels[opt.labelKey]}
              </span>
            </span>
            <span
              className={cn(
                "grid size-5 place-items-center rounded-full transition-colors",
                selected
                  ? "bg-foreground"
                  : "border border-muted-foreground/40 bg-transparent",
              )}
            >
              {selected && <span className="size-2 rounded-full bg-background" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
