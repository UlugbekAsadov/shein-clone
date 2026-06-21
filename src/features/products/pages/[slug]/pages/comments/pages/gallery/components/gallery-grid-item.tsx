import Image from "next/image";
import { Play } from "@solar-icons/react/ssr";
import type { IGalleryItem } from "@/features/products/pages/[slug]/pages/comments/pages/gallery/utils/gallery-item.interface";

interface IProps {
  item: IGalleryItem;
  onClick: () => void;
}

export function GalleryGridItem({ item, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted"
    >
      <Image
        src={item.src}
        alt=""
        fill
        quality={100}
        sizes="(min-width: 1280px) 280px, 25vw"
        className="object-cover"
      />
      {item.type === "video" && (
        <div className="absolute inset-0 grid place-items-center bg-black/30">
          <Play className="size-9 fill-white text-white" weight="Outline" />
        </div>
      )}
    </button>
  );
}
