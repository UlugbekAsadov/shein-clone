"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { CODE_LENGTH } from "@/features/auth/constants/login.constants";
import { LoginCodeInput } from "./login-code-input";
import { LoginResendTimer } from "./login-resend-timer";

interface IProps {
  labels: {
    title: string;
    subtitle: string;
    resend: string;
    continue: string;
  };
  hasError: boolean;
  hasSuccess: boolean;
  onCodeChange: () => void;
  onSubmit: (code: string) => void;
}

export function LoginCodeForm({
  labels,
  hasError,
  hasSuccess,
  onCodeChange,
  onSubmit,
}: IProps) {
  const [code, setCode] = useState("");
  const [resendSignal, setResendSignal] = useState(0);

  const isComplete = code.length === CODE_LENGTH;

  const handleChange = (next: string) => {
    setCode(next);
    if (hasError) onCodeChange();
  };

  const handleResend = () => {
    setCode("");
    setResendSignal((prev) => prev + 1);
    onCodeChange();
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    onSubmit(code);
  };

  return (
    <div className="flex h-full w-full max-w-md flex-1 flex-col gap-5 lg:h-auto lg:flex-none lg:gap-6">
      <div className="flex flex-col gap-2 text-left lg:text-center">
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
      />

      <div className="flex-1 lg:hidden" />

      <Button
        type="button"
        size="lg"
        onClick={handleSubmit}
        disabled={!isComplete || hasSuccess}
        className="h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
      >
        {labels.continue}
      </Button>
    </div>
  );
}
