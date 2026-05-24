"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { ACCOUNT_NOT_FOUND_CODE } from "@/features/auth/utils/auth.constants";
import { PHONE_DIGIT_COUNT } from "@/features/auth/login/utils/login.constants";
import {
  checkCodeAction,
  loginAction,
  registerAction,
  sendCodeAction,
} from "@/features/auth/services/auth.actions";
import type { IGender } from "@/features/auth/login/utils/register.interface";
import { useUser } from "@/features/auth/hooks/use-user";
import { LoginPhoneForm } from "@/features/auth/login/components/login-phone-form";
import { LoginCodeForm } from "@/features/auth/login/components/login-code-form";
import { LoginRegisterForm } from "@/features/auth/login/components/login-register-form";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
}

type IStep = "phone" | "code" | "register";

export function LoginPageContent({ lang, dict }: IProps) {
  const t = dict.auth.login;
  const router = useRouter();
  const { refresh } = useUser();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<IStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const goBack = () => {
    router.push(`/${lang}/profile`);
  };

  const finishSuccess = () => {
    refresh();
    router.push(`/${lang}/profile`);
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
      const loginResult = await loginAction(phone, nextCode);
      if (loginResult.ok) {
        setCodeSuccess(true);
        toast.success(t.code.success);
        finishSuccess();
        return;
      }

      if (loginResult.errorCode !== ACCOUNT_NOT_FOUND_CODE) {
        setCodeError(true);
        toast.error(loginResult.message ?? t.code.invalid);
        return;
      }

      const checkResult = await checkCodeAction(phone, nextCode);
      if (!checkResult.ok) {
        setCodeError(true);
        toast.error(checkResult.message ?? t.code.invalid);
        return;
      }

      setStep("register");
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
      finishSuccess();
    });
  };

  return (
    <div className="flex w-full flex-1 flex-col md:max-w-md md:flex-none">
      {step === "phone" && (
        <LoginPhoneForm
          labels={{
            title: t.title,
            subtitle: t.subtitle,
            phoneLabel: t.phoneLabel,
            phonePlaceholder: t.phonePlaceholder,
            continue: t.continue,
            terms: t.terms,
            social: t.social,
          }}
          phone={phone}
          onPhoneChange={setPhone}
          onSubmit={handlePhoneSubmit}
          onClose={goBack}
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
          onClose={() => setStep("phone")}
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
  );
}
