import Link from "next/link";
import { ArrowLeft } from "@solar-icons/react/ssr";
import { XIcon } from "@/shared/components/icons/outline";

interface IProps {
  backHref: string;
}

export function GalleryLoading({ backHref }: IProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href={backHref}
          className="flex items-center gap-3 text-base font-medium"
        >
          <span className="grid size-10 cursor-pointer place-items-center rounded-full bg-secondary hover:bg-muted">
            <ArrowLeft className="size-5" weight="Outline" />
          </span>
          Back to product
        </Link>
        <Link
          href={backHref}
          aria-label="Close"
          className="grid size-10 cursor-pointer place-items-center rounded-full bg-secondary hover:bg-muted"
        >
          <XIcon className="size-5" />
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-3 px-6 pb-8">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="aspect-3/4 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    </div>
  );
}
