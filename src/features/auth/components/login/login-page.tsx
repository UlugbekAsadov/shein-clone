"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  INVALID_CODE,
  PHONE_DIGIT_COUNT,
} from "@/features/auth/constants/login.constants";
import { LoginPhoneForm } from "./login-phone-form";
import { LoginCodeForm } from "./login-code-form";
import { LoginPreview } from "./login-preview";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

const SUCCESS_REDIRECT_DELAY_MS = 1500;

export function LoginPage({ lang, dict }: IProps) {
  const t = dict.auth.login;
  const router = useRouter();

  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const handlePhoneSubmit = () => {
    if (phone.length !== PHONE_DIGIT_COUNT) return;
    setStep("code");
  };

  const handleCodeSubmit = (code: string) => {
    if (code === INVALID_CODE) {
      setCodeError(true);
      toast.error(t.code.invalid);
      return;
    }
    setCodeSuccess(true);
    toast.success(t.code.success);
    setTimeout(() => {
      router.push(`/${lang}`);
    }, SUCCESS_REDIRECT_DELAY_MS);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-screen flex-col px-6 pt-10 pb-6 lg:min-h-0 lg:items-center lg:justify-center lg:px-16 lg:py-12">
        {step === "phone" ? (
          <LoginPhoneForm
            labels={{
              title: t.title,
              subtitle: t.subtitle,
              phoneLabel: t.phoneLabel,
              phonePlaceholder: t.phonePlaceholder,
              continue: t.continue,
              social: t.social,
            }}
            phone={phone}
            onPhoneChange={setPhone}
            onSubmit={handlePhoneSubmit}
          />
        ) : (
          <LoginCodeForm
            labels={{
              title: t.code.title,
              subtitle: t.code.subtitle,
              resend: t.code.resend,
              continue: t.code.continue,
            }}
            hasError={codeError}
            hasSuccess={codeSuccess}
            onCodeChange={() => setCodeError(false)}
            onSubmit={handleCodeSubmit}
          />
        )}
      </div>

      <LoginPreview />
    </div>
  );
}
