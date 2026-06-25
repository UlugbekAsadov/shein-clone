import Image from "next/image";
import { cn } from "@/lib/utils";

interface IProps {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
  className?: string;
  ringClassName?: string;
  imageClassName?: string;
}

export function CategorySquircle({
  src,
  alt,
  sizes,
  quality = 95,
  className,
  ringClassName,
  imageClassName,
}: IProps) {
  return (
    <span
      className={cn(
        "relative block bg-border [clip-path:url(#oneui-squircle)]",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-[3px] overflow-hidden bg-muted [clip-path:url(#oneui-squircle)]",
          ringClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          sizes={sizes}
          className={cn("object-cover", imageClassName)}
        />
      </span>
    </span>
  );
}
