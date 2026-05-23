import Image from "next/image";
import { Pause, Volume2 } from "lucide-react";
import type { IGalleryItem } from "@/features/product/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";

interface IProps {
  item: IGalleryItem;
}

export function GalleryDetailMedia({ item }: IProps) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-muted">
      <Image
        src={item.src}
        alt=""
        fill
        quality={90}
        sizes="(min-width: 1280px) 600px, 50vw"
        className="object-cover"
      />
      {item.type === "video" && (
        <>
          <div className="absolute inset-0 grid place-items-center bg-black/10">
            <button
              type="button"
              aria-label="Pause"
              className="grid size-16 cursor-pointer place-items-center rounded-full bg-black/50 text-white"
            >
              <Pause className="size-7 fill-white" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 px-5 pb-5 text-sm font-medium text-white">
            <span>0:20 / 1:00</span>
            <Volume2 className="size-5" />
            <div className="relative h-1 flex-1 rounded-full bg-white/40">
              <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-white" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
