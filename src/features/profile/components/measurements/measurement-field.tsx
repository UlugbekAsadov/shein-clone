"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { IMeasurementOption } from "@/features/profile/interfaces/measurement.interface";

interface IProps {
  label: string;
  placeholder: string;
  options: IMeasurementOption[];
  defaultValue?: string;
}

export function MeasurementField({
  label,
  placeholder,
  options,
  defaultValue,
}: IProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-6">
      <label className="text-lg font-medium text-secondary-foreground">{label}:</label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger className="h-12! w-full rounded-[8px] px-4 text-lg">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
