"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import type { IDictionary } from "@/core/config/i18n/dictionaries";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ACCOUNT_NOT_FOUND_CODE } from "@/features/auth/constants/auth.constants";
import { PHONE_DIGIT_COUNT } from "@/features/auth/constants/login.constants";
import {
  checkCodeAction,
  loginAction,
  registerAction,
  sendCodeAction,
} from "@/features/auth/services/auth.actions";
import type { IGender } from "@/features/auth/interfaces/register.interface";
import { useAuthDialog } from "@/features/auth/hooks/use-auth-dialog";
import { useUser } from "@/features/auth/hooks/use-user";
import { LoginPhoneForm } from "./login-phone-form";
import { LoginCodeForm } from "./login-code-form";
import { LoginRegisterForm } from "./login-register-form";

interface IProps {
  dict: IDictionary;
}

type IStep = "phone" | "code" | "register";

export function LoginDialog({ dict }: IProps) {
  const t = dict.auth.login;
  const { isOpen, close } = useAuthDialog();
  const { refresh } = useUser();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<IStep>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) return;
    setStep("phone");
    setPhone("");
    setCode("");
    setCodeError(false);
    setCodeSuccess(false);
  }, [isOpen]);

  const finishSuccess = () => {
    close();
    refresh();
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
    <Dialog
      open={isOpen}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogContent className="w-[min(92vw,448px)] max-h-[90vh] overflow-y-auto p-9 rounded-[30px]">
        <DialogTitle className="sr-only">{t.title}</DialogTitle>
        <DialogDescription className="sr-only">{t.subtitle}</DialogDescription>

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
            onClose={close}
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
            onClose={close}
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
      </DialogContent>
    </Dialog>
  );
}
