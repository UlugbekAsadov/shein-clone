import Link from "next/link";
import { AddCircle } from "@solar-icons/react/ssr";

interface IProps {
  href: string;
  label: string;
}

export function CardsMobileAddButton({ href, label }: IProps) {
  return (
    <div className="px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-4">
      <Link
        href={href}
        className="flex h-12.5 w-full items-center justify-center gap-2 rounded-sm bg-foreground text-lg font-medium text-background active:bg-foreground/90"
      >
        {label}
        <AddCircle className="size-5" weight="Outline" />
      </Link>
    </div>
  );
}
