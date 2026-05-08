import Image from "next/image";
import { Star, Sparkles } from "lucide-react";
import { featuredShops } from "@/lib/mock-data";
import { SectionHeader } from "./section-header";

type Props = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  followLabel: string;
  followingLabel: string;
};

export function FeaturedShops({
  title,
  subtitle,
  viewAllLabel,
  followLabel,
  followingLabel,
}: Props) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-6">
      <SectionHeader
        title={
          <span className="flex items-center gap-2">
            {title}
            <Sparkles className="size-5 text-amber-500" />
          </span>
        }
        subtitle={subtitle}
        viewAllHref="#"
        viewAllLabel={viewAllLabel}
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {featuredShops.map((shop, idx) => {
          const isFollowing = idx > 0 && idx < 4;
          return (
            <article
              key={shop.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-[3/2] bg-muted">
                <Image
                  src={shop.banner}
                  alt={shop.name}
                  fill
                  sizes="(max-width: 1440px) 20vw, 280px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 p-3">
                <Image
                  src={shop.avatar}
                  alt={shop.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full bg-muted"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold">
                    {shop.name}
                  </h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="size-3 fill-amber-400 text-amber-400" />
                    {shop.rating}
                    <span>·</span>
                    <span className="truncate">{shop.itemsSold}</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background hover:bg-foreground/90"
                >
                  {isFollowing ? followingLabel : followLabel}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
