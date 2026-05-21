"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { ACCOUNT_NOT_FOUND_CODE } from "@/features/auth/constants/auth.constants";
import { PHONE_DIGIT_COUNT } from "@/features/auth/constants/login.constants";
import {
  loginAction,
  registerAction,
  sendCodeAction,
} from "@/features/auth/services/auth.actions";
import type { IGender } from "@/features/auth/interfaces/register.interface";
import { LoginPhoneForm } from "./login-phone-form";
import { LoginCodeForm } from "./login-code-form";
import { LoginRegisterForm } from "./login-register-form";
import { LoginPreview } from "./login-preview";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

const SUCCESS_REDIRECT_DELAY_MS = 1500;

type IStep = "phone" | "code" | "register";

export function LoginPage({ lang, dict }: IProps) {
  const t = dict.auth.login;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<IStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const redirectHome = () => {
    setTimeout(() => router.push(`/${lang}`), SUCCESS_REDIRECT_DELAY_MS);
  };

  const handlePhoneSubmit = () => {
    if (phone.length !== PHONE_DIGIT_COUNT) return;
    startTransition(async () => {
      const result = await sendCodeAction(phone);
      if (!result.ok) {
        toast.error(result.message ?? t.code.invalid);
        return;
      }
      setStep("code");
    });
  };

  const handleCodeSubmit = (nextCode: string) => {
    setCode(nextCode);
    startTransition(async () => {
      const result = await loginAction(phone, nextCode);
      if (result.ok) {
        setCodeSuccess(true);
        toast.success(t.code.success);
        redirectHome();
        return;
      }

      if (result.errorCode === ACCOUNT_NOT_FOUND_CODE) {
        setStep("register");
        return;
      }
      setCodeError(true);
      toast.error(result.message ?? t.code.invalid);
    });
  };

  const handleResend = async (): Promise<boolean> => {
    const result = await sendCodeAction(phone);
    if (!result.ok) {
      toast.error(result.message ?? t.code.invalid);
      return false;
    }
    setCodeError(false);
    return true;
  };

  const handleRegisterSubmit = (values: {
    name: string;
    birthday: string;
    gender: IGender;
  }) => {
    startTransition(async () => {
      const result = await registerAction({
        phone,
        code,
        name: values.name,
        birthday: values.birthday,
        gender: values.gender,
      });
      if (!result.ok) {
        toast.error(result.message ?? t.code.invalid);
        return;
      }
      toast.success(t.code.success);
      redirectHome();
    });
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex min-h-screen flex-col px-6 pt-10 pb-6 lg:min-h-0 lg:items-center lg:justify-center lg:px-16 lg:py-12">
        {step === "phone" && (
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
            isPending={isPending}
          />
        )}
        {step === "code" && (
          <LoginCodeForm
            labels={{
              title: t.code.title,
              subtitle: t.code.subtitle,
              resend: t.code.resend,
              continue: t.code.continue,
            }}
            hasError={codeError}
            hasSuccess={codeSuccess}
            isPending={isPending}
            onCodeChange={() => setCodeError(false)}
            onSubmit={handleCodeSubmit}
            onResend={handleResend}
          />
        )}
        {step === "register" && (
          <LoginRegisterForm
            labels={{
              title: t.register.title,
              subtitle: t.register.subtitle,
              fullNameLabel: t.register.fullNameLabel,
              fullNamePlaceholder: t.register.fullNamePlaceholder,
              dobLabel: t.register.dobLabel,
              dobPlaceholder: t.register.dobPlaceholder,
              genderLabel: t.register.genderLabel,
              genderMale: t.register.genderMale,
              genderFemale: t.register.genderFemale,
              continue: t.register.continue,
            }}
            isPending={isPending}
            onSubmit={handleRegisterSubmit}
          />
        )}
      </div>

      <LoginPreview />
    </div>
  );
}
