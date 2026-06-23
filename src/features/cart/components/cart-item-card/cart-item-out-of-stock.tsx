import Link from "next/link";
import { AltArrowRight } from "@solar-icons/react";

interface IProps {
  note: string;
  exploreLabel: string;
  href: string;
}

export function CartItemOutOfStock({ note, exploreLabel, href }: IProps) {
  return (
    <div className="mt-3 flex flex-col gap-3 rounded-lg bg-rose-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-rose-600">{note}</p>
      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1 rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90"
      >
        {exploreLabel}
        <AltArrowRight className="size-4" weight="Outline" />
      </Link>
    </div>
  );
}
