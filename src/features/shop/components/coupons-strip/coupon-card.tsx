"use client";

import { useState } from "react";
import { Calendar, Check, Copy } from "lucide-react";
import type { ICoupon } from "@/features/shop/interfaces/coupon.interface";

interface IProps {
  coupon: ICoupon;
  couponLabel: string;
  daysLeftLabel: string;
  copyLabel: string;
  copiedLabel: string;
  minOrderLabel: string;
}

export function CouponCard({
  coupon,
  couponLabel,
  daysLeftLabel,
  copyLabel,
  copiedLabel,
  minOrderLabel,
}: IProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="relative overflow-hidden rounded-xl border border-rose-100 bg-gradient-to-br from-white via-rose-50 to-rose-100 p-5">
      <div className="absolute -right-12 -top-12 size-40 rounded-full bg-rose-300/40 blur-2xl" />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <span className="grid size-5 place-items-center rounded bg-foreground text-background">
            <Calendar className="size-3" />
          </span>
          {couponLabel}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {coupon.expiresAt}
        </span>
      </div>

      <div className="relative mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-4xl font-extrabold leading-none text-rose-500">
            {coupon.discount}
          </p>
          <p className="mt-2 text-base font-bold text-foreground">
            {coupon.title}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {minOrderLabel} ${coupon.minOrderAmount}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
          {coupon.daysLeft} {daysLeftLabel}
        </span>
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-2 rounded-lg bg-white p-2 shadow-sm">
        <span className="ml-2 truncate text-sm font-bold tracking-wider text-foreground">
          {coupon.code}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-foreground/90"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </article>
  );
}
