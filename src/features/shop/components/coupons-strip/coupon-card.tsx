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
    <article className="relative overflow-hidden rounded-md border-dashed border-2">
      <div className="relative flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
          <Ticket className="size-5" weight="Bold" />
          {couponLabel}
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {coupon.expiresAt}
        </span>
      </div>
      <div
        className="relative overflow-hidden rounded-t-md border border-white/50 bg-rose-50 bg-cover bg-center bg-no-repeat p-5"
        style={{ backgroundImage: "url('/images/coupon-card-bg.webp')" }}
      >
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
          <span className="shrink-0 rounded-[8px] bg-[#E83737] px-2.5 py-1.5 text-xs font-semibold text-white">
            {coupon.daysLeft} {daysLeftLabel}
          </span>
        </div>

        <div className="relative mt-5 flex items-center justify-between gap-2 rounded-[12px] bg-white p-1 pl-4 shadow-[0_4px_16px_rgba(244,63,94,0.12)] ring-1 ring-rose-100">
          <span className="truncate  font-medium tracking-[0.12em] text-foreground">
            {coupon.code}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-[8px] bg-foreground px-3 h-10 text-xs font-semibold text-background transition hover:bg-foreground/90 cursor-pointer"
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
