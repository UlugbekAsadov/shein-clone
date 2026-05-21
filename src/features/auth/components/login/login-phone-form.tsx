"use client";

import { Button } from "@/shared/components/ui/button";
import { PHONE_DIGIT_COUNT } from "@/features/auth/constants/login.constants";
import { LoginPhoneInput } from "./login-phone-input";
import { LoginSocialButtons } from "./login-social-buttons";
import { cn } from "@/lib/utils";

interface IProps {
  labels: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    phonePlaceholder: string;
    continue: string;
    social: {
      google: string;
      apple: string;
      mail: string;
      facebook: string;
      comingSoon: string;
    };
  };
  phone: string;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
  isPending?: boolean;
}

export function LoginPhoneForm({
  labels,
  phone,
  onPhoneChange,
  onSubmit,
  isPending = false,
}: IProps) {
  const isComplete = phone.length === PHONE_DIGIT_COUNT;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 flex-col gap-6",
        "md:max-w-md",
        "md:h-auto md:flex-none md:gap-8",
      )}
    >
      <div className="flex flex-col gap-2 text-left md:text-center">
        <h1 className="text-3xl font-bold text-foreground">{labels.title}</h1>
        <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="login-phone"
          className="text-sm font-medium text-foreground"
        >
          {labels.phoneLabel}
        </label>
        <LoginPhoneInput
          value={phone}
          onChange={onPhoneChange}
          placeholder={labels.phonePlaceholder}
        />
      </div>

      <div className="flex-1 md:hidden" />

      <Button
        type="button"
        size="lg"
        onClick={onSubmit}
        disabled={!isComplete || isPending}
        className="h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
      >
        {labels.continue}
      </Button>

      <LoginSocialButtons labels={labels.social} />
    </div>
  );
}
