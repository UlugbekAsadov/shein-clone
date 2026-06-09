"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { brands } from "@/shared/mocks";
import { BrandStoryItem } from "@/features/home/components/stories/story-item/brand-story-item";

interface IProps {
  excludeSlug?: string;
}

export function ShopMobileBrands({ excludeSlug }: IProps) {
  const { lang } = useParams<{ lang: string }>();
  const items = excludeSlug ? brands.filter((b) => b.slug !== excludeSlug) : brands;

  return (
    <div className="overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-start gap-4">
        {items.map((brand) => (
          <Link key={brand.id} href={`/${lang}/shop/${brand.slug}`}>
            <BrandStoryItem brand={brand} onClick={() => {}} />
          </Link>
        ))}
      </div>
    </div>
  );
}
