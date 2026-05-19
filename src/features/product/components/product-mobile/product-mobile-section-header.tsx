import Link from "next/link";
import { AltArrowRight } from "@solar-icons/react/ssr";

interface IProps {
  title: string;
  viewAllLabel?: string;
  viewAllHref?: string;
}

export function ProductMobileSectionHeader({
  title,
  viewAllLabel = "View all",
  viewAllHref,
}: IProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-bold text-foreground">{title}</h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex items-center gap-0.5 text-xs text-muted-foreground"
        >
          {viewAllLabel}
          <AltArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}
