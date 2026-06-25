"use client";

import { useDictionary } from "@/core/config/i18n/use-dictionary";

interface IProps {
  description: string;
}

export function ProductMobileDescription({ description }: IProps) {
  const dict = useDictionary();
  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-foreground">
        {dict.product.description}:
      </h3>
      <div
        className="mt-2 text-xs leading-relaxed text-muted-foreground [&_p]:mb-2"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
