import Link from "next/link";
import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";
import { AltArrowRight } from "@solar-icons/react/ssr";

interface IProps {
  icon: ComponentType<IconProps>;
  label: string;
  href?: string;
  trailing?: React.ReactNode;
}

export function ProfileMobileMenuRow({
  icon: Icon,
  label,
  href,
  trailing,
}: IProps) {
  const content = (
    <>
      <Icon weight="LineDuotone" className="size-6 text-foreground" />
      <span className="flex-1 text-base font-medium text-foreground">
        {label}
      </span>
      {trailing ?? <AltArrowRight className="size-5 text-muted-foreground" />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 px-4 py-3.5 text-left"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3.5">{content}</div>
  );
}
