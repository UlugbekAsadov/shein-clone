import Image from "next/image";
import { ProductMobileSectionHeader } from "./product-mobile-section-header";

interface IProps {
  title: string;
  images: string[];
  viewAllHref?: string;
}

export function ProductMobileMediaGallery({
  title,
  images,
  viewAllHref,
}: IProps) {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <ProductMobileSectionHeader title={title} viewAllHref={viewAllHref} />

      <div className="-mx-4 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-3/4 w-20 shrink-0 overflow-hidden rounded-[12px] bg-muted"
            >
              <Image
                src={src}
                alt=""
                fill
                quality={100}
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
