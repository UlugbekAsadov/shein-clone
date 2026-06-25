"use client";

import type { ComponentType, SVGProps } from "react";
import { MaleIcon, FemaleIcon } from "@/shared/components/icons/outline";

interface IOption {
  value: "male" | "female";
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface IProps {
  label: string;
  value: "male" | "female";
  onChange: (value: "male" | "female") => void;
  maleLabel: string;
  femaleLabel: string;
}

export function AccountGenderField({
  label,
  value,
  onChange,
  maleLabel,
  femaleLabel,
}: IProps) {
  const options: IOption[] = [
    { value: "male", label: maleLabel, icon: MaleIcon },
    { value: "female", label: femaleLabel, icon: FemaleIcon },
  ];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={
                selected
                  ? "flex h-12.5 items-center gap-2 rounded-sm border border-foreground bg-background px-4 text-foreground"
                  : "flex h-12.5 items-center gap-2 rounded-sm border border-transparent bg-secondary px-4 text-muted-foreground"
              }
            >
              <Icon className="size-6" />
              <span className="flex-1 text-left text-sm font-semibold">
                {option.label}
              </span>
              <span
                className={
                  selected
                    ? "grid size-5 place-items-center rounded-full bg-foreground"
                    : "grid size-5 place-items-center rounded-full border-2 border-border bg-background"
                }
              >
                {selected && (
                  <span className="size-1.5 rounded-full bg-background" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
