import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { IGalleryItem } from "../_lib/interface/gallery-item.interface";
import { GalleryDetailMedia } from "./gallery-detail-media";
import { GalleryDetailReview } from "./gallery-detail-review";

interface IProps {
  items: IGalleryItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

export function GalleryDetail({
  items,
  activeIndex,
  onChange,
  onClose,
}: IProps) {
  const item = items[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === items.length - 1;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-base font-medium">All photos and videos</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-10 cursor-pointer place-items-center rounded-full bg-secondary hover:bg-muted"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-6 px-6 pb-8">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={() => onChange(activeIndex - 1)}
            disabled={isFirst}
            aria-label="Previous"
            className="absolute left-2 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-secondary shadow-md hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="w-full max-w-[480px]">
            <GalleryDetailMedia item={item} />
          </div>

          <button
            type="button"
            onClick={() => onChange(activeIndex + 1)}
            disabled={isLast}
            aria-label="Next"
            className="absolute right-2 z-10 grid size-10 cursor-pointer place-items-center rounded-full bg-secondary shadow-md hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div>
          <GalleryDetailReview review={item.review} />
        </div>
      </div>
    </div>
  );
}
