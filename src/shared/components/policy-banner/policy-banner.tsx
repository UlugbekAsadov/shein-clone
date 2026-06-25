"use client";

import type { IDictionary } from "@/core/config/i18n/dictionaries";
import { Button } from "@/shared/components/ui/button";
import { usePolicyConsent } from "@/shared/hooks/use-policy-consent";

interface IProps {
  dict: IDictionary;
}

export function PolicyBanner({ dict }: IProps) {
  const { accepted, acceptPolicy } = usePolicyConsent();
  const p = dict.policyBanner;

  if (accepted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end bg-[#00000080]"
      role="dialog"
      aria-modal="true"
    >
      <div className="border-t border-border bg-background shadow-[0_-8px_24px_rgba(0,0,0,0.06)] pb-15 md:pb-0">
        <div className="mx-auto flex max-w-360 flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="min-w-0 flex flex-col items-end">
            <h4 className="mb-1 w-full text-base font-bold text-foreground">
              {p.title}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {p.description}{" "}
              <a
                href={p.moreHref}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {p.moreLabel}
              </a>
            </p>
            <Button
              onClick={acceptPolicy}
              className="shrink-0 px-8 md:self-center h-10 w-full md:w-fit md:h-12 rounded-[12px] ml-auto mt-2"
            >
              {p.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
