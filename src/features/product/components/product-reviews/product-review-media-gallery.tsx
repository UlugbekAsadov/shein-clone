import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { locales } from "@/core/config/i18n/i18n-config";

interface IProps {
  lang: (typeof locales)[number];
  slug: string;
  images: string[];
}

export function ProductReviewMediaGallery({ lang, slug, images }: IProps) {
  return (
    <div className="p-5 border rounded-lg">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="font-bold ">Image and video</span>
        <Link
          href={`/${lang}/product/${slug}/comments/gallery`}
          className="flex cursor-pointer items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          View all
          <ChevronRight className="size-5" />
        </Link>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {images.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="relative aspect-3/4 overflow-hidden rounded-lg bg-muted ring-1 ring-secondary-foreground/50 "
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
