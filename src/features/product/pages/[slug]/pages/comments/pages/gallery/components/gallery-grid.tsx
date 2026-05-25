import Link from "next/link";
import { ArrowLeft } from "@solar-icons/react/ssr";
import type { IGalleryItem } from "@/features/product/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";
import { XIcon } from "@/shared/components/icons/outline";
import { GalleryGridItem } from "./gallery-grid-item";

interface IProps {
  items: IGalleryItem[];
  backHref: string;
  onItemClick: (index: number) => void;
}

export function GalleryGrid({ items, backHref, onItemClick }: IProps) {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
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
        {items.map((item, idx) => (
          <GalleryGridItem
            key={item.id}
            item={item}
            onClick={() => onItemClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}
