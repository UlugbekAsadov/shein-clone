import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface IProps {
  images: string[];
}

export function ProductReviewMediaGallery({ images }: IProps) {
  return (
    <div className="p-5 border rounded-lg">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="font-bold ">Image and video</span>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View all
          <ChevronRight className="size-5" />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-2">
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
              sizes="80px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
