"use client";

import { useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";

interface IProps {
  body: string;
  privacyPolicyLabel: string;
  privacyPolicyHref: string;
}

export function MeasurementsConsent({
  body,
  privacyPolicyLabel,
  privacyPolicyHref,
}: IProps) {
  const [checked, setChecked] = useState(true);
  return (
    <div className="flex gap-3 text-sm leading-relaxed text-foreground">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
        className="mt-1"
      />
      <p className="whitespace-pre-line">
        {body}{" "}
        <a
          href={privacyPolicyHref}
          className="text-blue-600 underline hover:text-blue-700"
        >
          {privacyPolicyLabel}
        </a>
      </p>
    </div>
  );
}
