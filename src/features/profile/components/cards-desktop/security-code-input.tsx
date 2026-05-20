"use client";

import { useEffect, useRef } from "react";

interface IProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  autoFocus?: boolean;
}

export function SecurityCodeInput({
  length = 5,
  value,
  onChange,
  error = false,
  autoFocus = false,
}: IProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (autoFocus) {
      inputsRef.current[0]?.focus();
    }
  }, [autoFocus]);

  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

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
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
      return;
    }
    const next = digits.slice();
    for (let i = 0; i < raw.length && index + i < length; i++) {
      next[index + i] = raw[i];
    }
    onChange(next.join(""));
    const focusIndex = Math.min(index + raw.length, length - 1);
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
    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();
    const next = digits.slice();
    for (let i = 0; i < pasted.length && i < length; i++) {
      next[i] = pasted[i];
    }
    onChange(next.join(""));
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(node) => {
            inputsRef.current[index] = node;
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          value={digit}
          placeholder="0"
          onChange={(event) => handleChange(event, index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
          className={
            error
              ? "h-14 w-14 rounded-md border-2 border-destructive bg-destructive/10 text-center text-2xl font-bold text-destructive caret-destructive placeholder:text-destructive/40 focus:outline-none focus:placeholder:text-transparent"
              : digit
                ? "h-14 w-14 rounded-md border-2 border-border bg-background text-center text-2xl font-bold text-foreground focus:border-foreground focus:outline-none"
                : "h-14 w-14 rounded-md border-2 border-transparent bg-secondary text-center text-2xl font-bold text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none focus:placeholder:text-transparent"
          }
        />
      ))}
    </div>
  );
}
