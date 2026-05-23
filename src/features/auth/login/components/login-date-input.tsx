"use client";

import { Calendar } from "@solar-icons/react/ssr";
import { DOB_DIGIT_COUNT } from "@/features/auth/login/utils/login.constants";

interface IProps {
  value: string;
  onChange: (digits: string) => void;
  placeholder: string;
}

function formatDate(digits: string): string {
  const d = digits.slice(0, DOB_DIGIT_COUNT);
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}.${d.slice(2)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 4)}.${d.slice(4)}`;
}

export function LoginDateInput({ value, onChange, placeholder }: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");
    onChange(digits.slice(0, DOB_DIGIT_COUNT));
  };

  return (
    <div className="relative">
      <input
        id="register-dob"
        type="text"
        inputMode="numeric"
        autoComplete="bday"
        value={formatDate(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-12.5 w-full rounded-sm bg-secondary px-4 pr-12 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      <Calendar className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
