"use client";

import { useState } from "react";
import { CheckCircle, Copy, Ticket } from "@solar-icons/react/ssr";
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
    <article className="relative overflow-hidden rounded-md border-dashed border">
      <div className="relative flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <span className="grid size-5 place-items-center rounded-[6px] bg-foreground text-background">
            <Ticket className="size-3.5" weight="Bold" />
          </span>
          {couponLabel}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {coupon.expiresAt}
        </span>
      </div>
      <div className="relative overflow-hidden  bg-gradient-to-br from-white via-white to-rose-50 p-5 rounded-t-md border border-white/50">
        <div className="pointer-events-none absolute -right-16 top-1/3 size-56 rounded-full bg-rose-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-0 size-48 rounded-full bg-rose-400/35 blur-3xl" />
        <div className="relative flex items-start justify-between gap-3 overflow-hidden">
          <div className="min-w-0">
            <p className="text-[40px] font-extrabold leading-none tracking-tight text-foreground">
              {coupon.discount}
            </p>
            <p className="mt-3 text-base font-bold text-foreground">
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

        <div className="relative mt-5 flex items-center justify-between gap-2 rounded-xl bg-white p-1.5 pl-4 shadow-[0_4px_16px_rgba(244,63,94,0.12)] ring-1 ring-rose-100">
          <span className="truncate text-sm font-bold tracking-[0.12em] text-foreground">
            {coupon.code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-foreground/90"
          >
            <span>{copied ? copiedLabel : copyLabel}</span>
            {copied ? (
              <CheckCircle className="size-3.5" weight="Bold" />
            ) : (
              <Copy className="size-3.5" weight="Bold" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
