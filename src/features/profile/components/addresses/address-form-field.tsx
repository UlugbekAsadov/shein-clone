"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import type { IAddressOption } from "@/features/profile/interfaces/address.interface";

interface IProps {
  label: string;
  placeholder: string;
  options: IAddressOption[];
}

export function AddressFormField({ label, placeholder, options }: IProps) {
  return (
    <div className="grid grid-cols-[160px_1fr] items-center gap-6">
      <label className="text-sm font-medium">{label}</label>
      <Select>
        <SelectTrigger className="h-12 w-full rounded-lg px-4 text-sm">
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
