"use client";

import Link from "next/link";
import { CartLarge2 } from "@solar-icons/react/ssr";
import { useCart } from "@/features/cart/hooks/use-cart";

interface IProps {
  lang: string;
}

export function HeaderCartButton({ lang }: IProps) {
  const { totalQuantity } = useCart();

  return (
    <Link
      href={`/${lang}/demo/cart`}
      aria-label="Cart"
      className="relative rounded-full"
    >
      <CartLarge2 className="size-6 text-secondary-foreground" />
      {totalQuantity > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
