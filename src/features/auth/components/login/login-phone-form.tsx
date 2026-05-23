"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { PHONE_DIGIT_COUNT } from "@/features/auth/constants/login.constants";
import { LoginPhoneInput } from "./login-phone-input";
import { LoginSocialButtons } from "./login-social-buttons";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface IProps {
  labels: {
    title: string;
    subtitle: string;
    phoneLabel: string;
    phonePlaceholder: string;
    continue: string;
    terms: {
      label: string;
      privacyPolicy: string;
    };
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
  onClose?: () => void;
  isPending?: boolean;
}

const PRIVACY_HREF = "#";
const TERMS_CHECKBOX_ID = "login-terms";

export function LoginPhoneForm({
  labels,
  phone,
  onPhoneChange,
  onSubmit,
  onClose,
  isPending = false,
}: IProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const isComplete = phone.length === PHONE_DIGIT_COUNT;
  const canSubmit = isComplete && acceptedTerms && !isPending;

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 flex-col gap-6",
        "md:max-w-md",
        "md:h-auto md:flex-none md:gap-8",
      )}
    >
      <div className="flex gap-2 text-left items-center justify-between md:text-center">
        <h1 className="text-2xl font-bold text-foreground">{labels.title}</h1>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="text-muted-foreground cursor-pointer"
        >
          <XIcon className="size-6" />
        </button>
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

      <LoginSocialButtons labels={labels.social} />

      <div className="flex items-start gap-3">
        <Checkbox
          id={TERMS_CHECKBOX_ID}
          checked={acceptedTerms}
          onCheckedChange={(value) => setAcceptedTerms(value === true)}
          className="mt-0.5 size-4.5"
        />
        <div className="text-xs leading-snug text-secondary-foreground select-none font-medium">
          <label htmlFor={TERMS_CHECKBOX_ID}>{labels.terms.label}</label>
          <a
            href={PRIVACY_HREF}
            onClick={(event) => event.preventDefault()}
            className="text-blue-400 underline underline-offset-2 hover:text-blue-500 block"
          >
            {labels.terms.privacyPolicy}
          </a>
        </div>
      </div>

      <Button
        type="button"
        size="lg"
        onClick={onSubmit}
        disabled={!canSubmit}
        className="h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
      >
        {labels.continue}
      </Button>
    </div>
  );
}
