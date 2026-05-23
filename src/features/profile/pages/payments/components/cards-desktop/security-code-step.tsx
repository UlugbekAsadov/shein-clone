"use client";

import { useEffect, useState } from "react";
import { Refresh } from "@solar-icons/react/ssr";
import { Button } from "@/shared/components/ui/button";
import { SecurityCodeInput } from "./security-code-input";

interface IProps {
  description: string;
  continueLabel: string;
  resendLabel: string;
  onContinue: (code: string) => void;
  hasError: boolean;
  onCodeChange?: () => void;
}

const INITIAL_SECONDS = 59;
const CODE_LENGTH = 5;

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function SecurityCodeStep({
  description,
  continueLabel,
  resendLabel,
  onContinue,
  hasError,
  onCodeChange,
}: IProps) {
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const handle = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(handle);
  }, [seconds]);

  const isComplete = code.length === CODE_LENGTH;

  const handleResend = () => {
    setSeconds(INITIAL_SECONDS);
    setCode("");
    onCodeChange?.();
  };

  const handleContinue = () => {
    if (!isComplete) return;
    onContinue(code);
  };

  const handleChange = (next: string) => {
    setCode(next);
    if (hasError) onCodeChange?.();
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">{description}</p>

      <SecurityCodeInput
        value={code}
        onChange={handleChange}
        error={hasError}
        autoFocus
      />

      <div className="flex items-center gap-2 text-sm">
        <span className="text-foreground">{resendLabel}</span>
        {seconds > 0 ? (
          <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-foreground">
            {formatSeconds(seconds)}
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            aria-label={resendLabel}
            className="grid h-7 w-9 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
          >
            <Refresh className="size-5" />
          </button>
        )}
      </div>

      <Button
        type="button"
        size="lg"
        onClick={handleContinue}
        disabled={!isComplete}
        className="h-12.5 w-full rounded-sm text-base font-semibold disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-100"
      >
        {continueLabel}
      </Button>
    </div>
  );
}
