import Image from "next/image";
import { VerifiedCheck, Star, CloseCircle } from "@solar-icons/react/ssr";
import type { IShop } from "@/types/shop.interface";
import { cn } from "@/lib/utils";

interface IProps {
  shop: IShop;
  followLabel: string;
  followingLabel: string;
}

export function FeaturedShopMobileCard({
  shop,
  followLabel,
  followingLabel,
}: IProps) {
  return (
    <article className="relative flex flex-col items-center rounded-[21px] border border-border bg-card p-4 pt-3">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-foreground hover:bg-muted"
      >
        <CloseCircle className="size-5" weight="Outline" />
      </button>

      <div className="grid size-22 place-items-center overflow-hidden rounded-full bg-foreground">
        <Image
          src={shop.avatar}
          alt={shop.name}
          width={96}
          height={96}
          quality={95}
          className="size-full object-cover"
        />
      </div>

      <h3 className="mt-3 flex items-center gap-1 text-base font-bold">
        <span className="truncate">{shop.name}</span>
        {shop.verified && (
          <VerifiedCheck className="size-4 shrink-0 fill-sky-500 text-white" weight="Outline" />
        )}
      </h3>
      <p className="text-sm text-muted-foreground">{shop.category}</p>

      <div className="mt-1 flex items-center gap-1 text-sm">
        <Star className="size-4 fill-amber-400 text-amber-400" weight="Outline" />
        <span className="font-semibold">{shop.rating.toFixed(1)}</span>
        <span className="text-muted-foreground">({shop.reviews})</span>
      </div>

      <button
        type="button"
        className={cn(
          "mt-3 h-10 w-full rounded-[10px] text-sm font-semibold transition",
          shop.isFollowing
            ? "border border-foreground bg-card text-foreground hover:bg-muted"
            : "bg-foreground text-background hover:bg-foreground/90",
        )}
      >
        {shop.isFollowing ? followingLabel : followLabel}
      </button>
    </article>
  );
}
