import Image from "next/image";
import { ChevronRight, Play } from "lucide-react";

interface IProps {
  images: string[];
  videoIndex?: number;
}

export function CommentsMediaGallery({ images, videoIndex }: IProps) {
  return (
    <div className="rounded-lg border border-border p-5">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="font-bold">Image and video</span>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View all
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-2">
        {images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted"
          >
            <Image
              src={src}
              alt=""
              fill
              quality={80}
              sizes="60px"
              className="object-cover"
            />
            {idx === videoIndex && (
              <div className="absolute inset-0 grid place-items-center bg-black/30">
                <Play className="size-6 fill-white text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
