"use client";

import { useEffect, useState } from "react";
import { Refresh } from "@solar-icons/react/ssr";
import { INITIAL_SECONDS } from "@/features/auth/constants/login.constants";

interface IProps {
  resetSignal: number;
  resendLabel: string;
  onResend: () => void;
}

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function LoginResendTimer({
  resetSignal,
  resendLabel,
  onResend,
}: IProps) {
  const [seconds, setSeconds] = useState(INITIAL_SECONDS);

  useEffect(() => {
    setSeconds(INITIAL_SECONDS);
  }, [resetSignal]);

  useEffect(() => {
    if (seconds <= 0) return;
    const handle = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(handle);
  }, [seconds]);

  return (
    <div className="flex items-center justify-start gap-2 text-sm lg:justify-center">
      <span className="text-foreground">{resendLabel}</span>
      {seconds > 0 ? (
        <span className="rounded-md bg-secondary px-2 py-1 text-sm font-medium text-secondary-foreground">
          {formatSeconds(seconds)}
        </span>
      ) : (
        <button
          type="button"
          onClick={onResend}
          aria-label={resendLabel}
          className="grid h-7 w-9 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <Refresh className="size-5" />
        </button>
      )}
    </div>
  );
}
