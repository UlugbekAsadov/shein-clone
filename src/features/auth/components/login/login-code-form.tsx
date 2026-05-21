"use client";

import { useState, useTransition } from "react";
import { Button } from "@/shared/components/ui/button";
import { CODE_LENGTH } from "@/features/auth/constants/login.constants";
import { LoginCodeInput } from "./login-code-input";
import { LoginResendTimer } from "./login-resend-timer";
import { cn } from "@/lib/utils";

interface IProps {
  labels: {
    title: string;
    subtitle: string;
    resend: string;
    continue: string;
  };
  hasError: boolean;
  hasSuccess: boolean;
  isPending?: boolean;
  onCodeChange: () => void;
  onSubmit: (code: string) => void;
  onResend?: () => Promise<boolean> | boolean;
}

export function LoginCodeForm({
  labels,
  hasError,
  hasSuccess,
  isPending = false,
  onCodeChange,
  onSubmit,
  onResend,
}: IProps) {
  const [code, setCode] = useState("");
  const [resendSignal, setResendSignal] = useState(0);
  const [isResending, startResend] = useTransition();

  const isComplete = code.length === CODE_LENGTH;

  const handleChange = (next: string) => {
    setCode(next);
    if (hasError) onCodeChange();
  };

  const handleResend = () => {
    if (!onResend) {
      setCode("");
      setResendSignal((prev) => prev + 1);
      onCodeChange();
      return;
    }
    startResend(async () => {
      const ok = await onResend();
      if (!ok) return;
      setCode("");
      setResendSignal((prev) => prev + 1);
      onCodeChange();
    });
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    onSubmit(code);
  };

  return (
    <div
      className={cn(
        "flex h-full w-full flex-1 flex-col gap-5",
        "md:max-w-md",
        "md:h-auto md:flex-none md:gap-6",
      )}
    >
      <div className="flex flex-col gap-2 text-left md:text-center">
        <h1 className="text-3xl font-bold text-foreground">{labels.title}</h1>
        <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
      </div>

      <LoginCodeInput
        value={code}
        onChange={handleChange}
        error={hasError}
        success={hasSuccess}
        autoFocus
      />

      <LoginResendTimer
        resetSignal={resendSignal}
        resendLabel={labels.resend}
        onResend={handleResend}
        disabled={isResending}
      />

      <div className="flex-1 md:hidden" />

      <Button
        type="button"
        size="lg"
        onClick={handleSubmit}
        disabled={!isComplete || hasSuccess || isPending}
        className="h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
      >
        {labels.continue}
      </Button>
    </div>
  );
}
