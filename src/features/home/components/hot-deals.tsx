"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { hotDeals } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductHorizontalList } from "@/shared/components/product/product-horizontal-list";
import { SectionHeader } from "./section-header";

interface IProps {
  title: string;
  viewAllLabel: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function HotDeals({ title, viewAllLabel }: IProps) {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 24 * 60 + 12);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  return (
    <section className="mx-auto max-w-360 px-4 py-4 md:px-6 md:py-6">
      <div className="rounded-xl bg-gradient-to-br from-rose-500 via-rose-600 to-red-700 p-3 md:p-5">
        <SectionHeader
          title={
            <span className="flex items-center gap-3 text-white">
              {title}
              <Flame className="size-5 text-amber-300" />
              <span className="flex items-center gap-1 text-sm font-normal">
                {[h, m, s].map((v, i) => (
                  <span
                    key={i}
                    className="grid h-7 min-w-7 place-items-center rounded-md bg-foreground px-1.5 font-mono text-xs font-bold text-background"
                  >
                    {pad(v)}
                  </span>
                ))}
              </span>
            </span>
          }
          rightAction={
            <a
              href="#"
              className="hidden items-center gap-1 text-sm font-medium text-white hover:underline md:inline-flex"
            >
              {viewAllLabel}
            </a>
          }
        />

        <div className="md:hidden">
          <ProductHorizontalList products={hotDeals} variant="dark" />
          <Link
            href="#"
            className="mt-3 grid h-12 w-full place-items-center rounded-full bg-background text-base font-semibold text-foreground hover:bg-background/90"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="hidden md:block">
          <ProductGrid products={hotDeals} variant="dark" />
        </div>
      </div>
    </section>
  );
}
