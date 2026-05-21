"use client";

import { useEffect, useRef } from "react";
import { CODE_LENGTH } from "@/features/auth/constants/login.constants";
import { cn } from "@/lib/utils";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  success: boolean;
  autoFocus?: boolean;
}

export function LoginCodeInput({
  value,
  onChange,
  error,
  success,
  autoFocus = false,
}: IProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) {
      inputsRef.current[0]?.focus();
    }
  }, [autoFocus]);

  const digits = Array.from({ length: CODE_LENGTH }, (_, i) => value[i] ?? "");

  const setDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const raw = event.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }
    if (raw.length === 1) {
      setDigit(index, raw);
      if (index < CODE_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      return;
    }
    const next = digits.slice();
    for (let i = 0; i < raw.length && index + i < CODE_LENGTH; i++) {
      next[index + i] = raw[i];
    }
    onChange(next.join(""));
    const focusIndex = Math.min(index + raw.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      setDigit(index - 1, "");
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      event.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();
    const next = digits.slice();
    for (let i = 0; i < pasted.length && i < CODE_LENGTH; i++) {
      next[i] = pasted[i];
    }
    onChange(next.join(""));
    const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  const stateClasses = (digit: string) => {
    if (success) {
      return "border-emerald-500 bg-emerald-500/10 text-emerald-500 caret-emerald-500 placeholder:text-emerald-500/40 focus:placeholder:text-transparent";
    }
    if (error) {
      return "border-destructive bg-destructive/10 text-destructive caret-destructive placeholder:text-destructive/40 focus:placeholder:text-transparent";
    }
    if (digit) {
      return "border-foreground bg-background text-foreground focus:placeholder:text-transparent";
    }
    return "border-border bg-secondary text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:placeholder:text-transparent";
  };

  const isLocked = success;

  return (
    <div className="flex items-center justify-start gap-2 sm:gap-3 lg:justify-center">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node;
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH}
          value={digit}
          placeholder="0"
          readOnly={isLocked}
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
          className={cn(
            "h-13 w-13 rounded-sm border text-center text-2xl font-bold transition-colors focus:outline-none sm:h-15 sm:w-15 sm:text-3xl",
            stateClasses(digit),
          )}
        />
      ))}
    </div>
  );
}
