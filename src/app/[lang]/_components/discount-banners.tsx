import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { discountTiles } from "@/lib/mock-data";

type Props = {
  discountLabel: string;
};

export function DiscountBanners({ discountLabel }: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {discountTiles.map((tile) => (
          <article
            key={tile.id}
            className="relative flex h-60 overflow-hidden rounded-2xl text-white py-5 px-[18px] gap-6"
            style={{ background: tile.background }}
          >
            <Image
              src={tile.bgImage}
              alt=""
              aria-hidden
              fill
              quality={95}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />

            <div className="relative z-10 h-full w-1/3 shrink-0">
              <Image
                src={tile.image}
                alt={tile.shopName}
                fill
                quality={95}
                sizes="(min-width: 1024px) 12vw, (min-width: 640px) 18vw, 30vw"
                className="object-cover rounded-xl"
              />
            </div>

            <div className="relative z-10 flex flex-1 justify-between flex-col">
              <div className="w-fit flex items-center gap-2 rounded-full bg-black/30 py-1 pl-1 pr-3 backdrop-blur">
                <Image
                  src="/placeholders/avatar.svg"
                  alt={tile.shopName}
                  width={28}
                  height={28}
                  quality={95}
                  className="size-7 rounded-full ring-1 ring-white/40"
                />
                <div className="leading-tight">
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <span>{tile.shopName}</span>
                    {tile.verified && (
                      <BadgeCheck className="size-3.5 fill-sky-400 text-white" />
                    )}
                  </div>
                  <div className="text-[10px] opacity-90">
                    {tile.shopCategory}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-end pb-5 pr-6">
                <span className="text-lg font-medium leading-tight">
                  {discountLabel}
                </span>
                <span className="text-6xl font-black leading-none tracking-tight">
                  {tile.percent}%
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
