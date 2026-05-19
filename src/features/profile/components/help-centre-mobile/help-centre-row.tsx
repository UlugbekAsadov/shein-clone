import type { ReactNode } from "react";
import { AltArrowRight } from "@solar-icons/react/ssr";

interface IProps {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

export function HelpCentreRow({ icon, label, value, href, external }: IProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : undefined;

  return (
    <a
      href={href}
      {...externalProps}
      className="flex items-center gap-3 rounded-[18px] bg-secondary p-3 active:bg-secondary/80"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-background">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{value}</p>
      </div>
      <AltArrowRight className="size-6 shrink-0 text-foreground" />
    </a>
  );
}
