"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { IMeasurementOption } from "@/features/profile/pages/measurements/utils/measurement.interface";

interface IProps {
  label: string;
  placeholder: string;
  options: IMeasurementOption[];
  value: string;
  onChange: (value: string) => void;
}

export function MeasurementField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: IProps) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center gap-4">
      <label className="text-base font-medium text-foreground">
        {label}:
      </label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger className="h-12! w-full rounded-sm bg-secondary px-4 font-semibold text-base data-placeholder:text-muted-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" className="max-h-72">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-base"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
