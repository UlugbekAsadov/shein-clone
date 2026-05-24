import { AltArrowLeft, AltArrowRight, CloseCircle } from "@solar-icons/react/ssr";
import type { IGalleryItem } from "@/features/product/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";
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
          <CloseCircle className="size-5" weight="Outline" />
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
            <AltArrowLeft className="size-5" weight="Outline" />
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
            <AltArrowRight className="size-5" weight="Outline" />
          </button>
        </div>

        <div>
          <GalleryDetailReview review={item.review} />
        </div>
      </div>
    </div>
  );
}
