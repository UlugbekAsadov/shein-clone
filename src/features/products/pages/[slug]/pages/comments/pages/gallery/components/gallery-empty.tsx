import Link from "next/link";
import { Gallery } from "@solar-icons/react/ssr";
import { XIcon } from "@/shared/components/icons/outline";

interface IProps {
  backHref: string;
}

export function GalleryEmpty({ backHref }: IProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex items-center justify-end px-6 py-4">
        <Link
          href={backHref}
          aria-label="Close"
          className="grid size-10 cursor-pointer place-items-center rounded-full bg-secondary hover:bg-muted"
        >
          <XIcon className="size-5" />
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
        <Gallery className="size-12" weight="Outline" />
        <p className="text-base font-medium">No photos yet</p>
      </div>
    </div>
  );
}
