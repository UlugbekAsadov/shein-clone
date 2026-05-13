"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/core/config/i18n/i18n-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  UzbekistanFlagIcon,
  RussiaFlagIcon,
  AmericaFlagIcon,
} from "../icons/outline";
import { Global } from "@solar-icons/react";

interface IProps {
  current: (typeof locales)[number];
}

function getFlagIcon(locale: (typeof locales)[number]) {
  switch (locale) {
    case "uz":
      return <UzbekistanFlagIcon className="size-5.25" />;
    case "ru":
      return <RussiaFlagIcon className="size-5.25" />;
    case "en":
      return <AmericaFlagIcon className="size-5.25" />;
  }
}

export function LocaleSwitcher({ current }: IProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (target: string) => {
    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = target;
    router.push(segments.join("/") || `/${target}`);
  };

  return (
    <Select value={current} onValueChange={handleChange}>
      <SelectTrigger
        className="h-auto gap-1.5 border-0 bg-transparent px-0 py-1 text-sm font-medium shadow-none hover:opacity-80 focus:ring-0 cursor-pointer"
        aria-label="Language"
      >
        <Global className="size-5.25 text-secondary-foreground" />
        <SelectValue className="uppercase">
          <span className="uppercase">{current}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="start"
        position="popper"
        className="min-w-32 rounded-md"
      >
        {locales.map((l) => (
          <SelectItem key={l} value={l} className="px-3 py-3.5">
            {getFlagIcon(l)}
            <span className="uppercase text-secondary-foreground">{l}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
