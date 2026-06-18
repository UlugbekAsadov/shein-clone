import Image from "next/image";
import Link from "next/link";
import { VerifiedCheck, Star } from "@solar-icons/react/ssr";
import type { IApiFeaturedShop } from "@/features/home/utils/featured-shop.interface";
import { XIcon } from "@/shared/components/icons/outline";
import { cn } from "@/lib/utils";

interface IProps {
  shop: IApiFeaturedShop;
  followLabel: string;
  followingLabel: string;
  lang: string;
}

export function FeaturedShopMobileCard({
  shop,
  followLabel,
  followingLabel,
  lang,
}: IProps) {
  return (
    <article className="relative flex flex-col items-center rounded-[21px] border border-border bg-card p-4 pt-3">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute right-2 top-2 grid size-7 place-items-center rounded-full text-foreground hover:bg-muted"
      >
        <XIcon className="size-5" />
      </button>

      <div className="grid size-22 place-items-center overflow-hidden rounded-full bg-foreground">
        <Image
          src={shop.avatar_url}
          alt={shop.display_name}
          width={96}
          height={96}
          quality={95}
          className="size-full object-cover"
        />
      </div>

      <h3 className="mt-3 flex items-center gap-1 text-base font-bold">
        <Link
          href={`/${lang}/demo/shop/${shop.id}`}
          className="truncate hover:underline"
        >
          {shop.display_name}
        </Link>
        {shop.is_verified && (
          <VerifiedCheck className="size-4 shrink-0 fill-sky-500 text-white" weight="Outline" />
        )}
      </h3>
      <p className="text-sm text-muted-foreground">{shop.seller_type}</p>

      <div className="mt-1 flex items-center gap-1 text-sm">
        <Star className="size-4 fill-amber-400 text-amber-400" weight="Outline" />
        <span className="font-semibold">{shop.rating.toFixed(1)}</span>
        <span className="text-muted-foreground">({shop.sales_count})</span>
      </div>

      <button
        type="button"
        className={cn(
          "mt-3 h-10 w-full rounded-[10px] text-sm font-semibold transition",
          shop.is_followed
            ? "border border-foreground bg-card text-foreground hover:bg-muted"
            : "bg-foreground text-background hover:bg-foreground/90",
        )}
      >
        {shop.is_followed ? followingLabel : followLabel}
      </button>
    </article>
  );
}
