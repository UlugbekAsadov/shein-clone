import Image from "next/image";
import Link from "next/link";
import { AltArrowRight, Play } from "@solar-icons/react/ssr";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  slug: string;
  images: string[];
  videoIndex?: number;
}

export function CommentsMediaGallery({
  lang,
  slug,
  images,
  videoIndex,
}: IProps) {
  return (
    <div className="rounded-lg border border-border p-5">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="font-bold">Image and video</span>
        <Link
          href={`/${lang}/products/${slug}/comments/gallery`}
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View all
          <AltArrowRight className="size-5" weight="Outline" />
        </Link>
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
              quality={100}
              sizes="60px"
              className="object-cover"
            />
            {idx === videoIndex && (
              <div className="absolute inset-0 grid place-items-center bg-black/30">
                <Play className="size-6 fill-white text-white" weight="Outline" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
