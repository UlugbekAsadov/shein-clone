import Image from "next/image";
import Link from "next/link";
import { shopByCategory } from "@/lib/mock-data";
import type { locales } from "@/lib/i18n-config";
import { SectionHeader } from "./section-header";

interface IProps {
  lang: (typeof locales)[number];
  title: string;
  viewAllLabel: string;
}

export function ShopByCategory({ lang, title, viewAllLabel }: IProps) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-8">
      <SectionHeader
        title={title}
        viewAllHref="#"
        viewAllLabel={viewAllLabel}
      />
      <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {shopByCategory.map((c) => (
          <Link
            key={c.id}
            href={`/${lang}/category/${c.slug}`}
            className="flex w-[126px] shrink-0 flex-col items-center gap-2 cursor-pointer relative"
          >
            <span className="relative aspect-square w-full max-h-[120px] max-w-[120px] overflow-hidden rounded-full bg-muted ">
              <Image
                src={c.image ?? "/placeholders/category.svg"}
                alt={c.name}
                fill
                quality={95}
                sizes="120px"
                className="object-contain"
              />
            </span>
            {c.badge && (
              <span className="absolute z-20 right-1 top-1 grid h-6 min-w-10 place-items-center rounded-full bg-rose-500 px-2 text-[11px] font-semibold text-white">
                {c.badge}
              </span>
            )}
            <span className="text-sm font-medium text-foreground">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
