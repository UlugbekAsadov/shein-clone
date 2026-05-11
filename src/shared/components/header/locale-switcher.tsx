"use client";

import { Globe } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/core/config/i18n/i18n-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface IProps {
  current: (typeof locales)[number];
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
        className="h-auto gap-1.5 border-0 bg-transparent px-2 py-1 text-sm font-medium shadow-none hover:opacity-80 focus:ring-0"
        aria-label="Language"
      >
        <SelectValue className="uppercase" />
      </SelectTrigger>
      <SelectContent align="start" position="popper" className="min-w-32">
        {locales.map((l) => (
          <SelectItem key={l} value={l}>
            <Globe className="size-6 text-muted-foreground" />
            <span className="uppercase">{l}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
