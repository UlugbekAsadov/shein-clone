"use client";

import Link from "next/link";
import { hotDeals } from "@/shared/mocks";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductHorizontalList } from "@/shared/components/product/product-horizontal-list";
import { HotDealsHeader } from "./hot-deals-header";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

export function HotDeals({ title, subtitle, viewAllLabel }: IProps) {
  return (
    <section className="mx-auto max-w-360 px-4 py-2 md:px-6 md:py-3">
      <div
        className="rounded-xl bg-cover bg-center bg-no-repeat p-3 md:p-5"
        style={{ backgroundImage: "url('/images/hot-deals-background.webp')" }}
      >
        <HotDealsHeader
          title={title}
          subtitle={subtitle}
          viewAllLabel={viewAllLabel}
        />

        <div className="md:hidden">
          <ProductHorizontalList products={hotDeals} variant="dark" />
          <Link
            href="#"
            className="mt-3 grid h-10.5 w-full place-items-center rounded-sm bg-background text-base font-semibold text-foreground hover:bg-background/90"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="hidden md:block">
          <ProductGrid products={hotDeals} />
        </div>
      </div>
    </section>
  );
}
