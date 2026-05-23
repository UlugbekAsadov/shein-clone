"use client";

import { PHONE_DIGIT_COUNT } from "@/features/auth/login/utils/login.constants";
import { UzbekistanFlagIcon } from "@/shared/components/icons/outline";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function formatPhone(digits: string): string {
  const d = digits.slice(0, PHONE_DIGIT_COUNT);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)} ${d.slice(2)}`;
  if (d.length <= 7) return `${d.slice(0, 2)} ${d.slice(2, 5)}-${d.slice(5)}`;
  return `${d.slice(0, 2)} ${d.slice(2, 5)}-${d.slice(5, 7)}-${d.slice(7)}`;
}

export function LoginPhoneInput({
  value,
  onChange,
  placeholder,
}: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, "");
    onChange(digits.slice(0, PHONE_DIGIT_COUNT));
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-12.5 w-25 items-center justify-center gap-2 rounded-sm bg-secondary px-3">
        <UzbekistanFlagIcon className="size-6" />
        <span className="text-base font-medium text-foreground">+998</span>
      </div>
      <input
        id="login-phone"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={formatPhone(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-12.5 flex-1 rounded-sm bg-secondary px-4 text-base font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
