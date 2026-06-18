import Link from "next/link";
import { ProductGrid } from "@/shared/components/product/product-grid";
import { ProductHorizontalList } from "@/shared/components/product/product-horizontal-list";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types";
import { Icon } from "@solar-icons/react/lib/types";
import { ProductGroupHeader } from "./product-group-header";
import type {
  ISolidBg,
  ILinearGradientBg,
  IRadialGradientBg,
  IImageBg,
} from "@/features/home/utils/product-section.interface";
import {
  getBgStyle,
  getBgPrimaryHex,
} from "@/features/home/utils/bg-color.utils";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  products: IProduct[];
  viewAllHref: string;
  bgColor?: ISolidBg | ILinearGradientBg | IRadialGradientBg | IImageBg;
  Icon?: Icon | React.FC;
  bgImage?: string;
  textColor?: string;
  descriptionColor?: string;
  timer?: number;
  timerColor?: string;
  type?: "list" | "card";
}

function getContrastColor(hex: string): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 160 ? "#1a1a1a" : "#ffffff";
}

export function ProductGroup({
  title,
  subtitle,
  viewAllLabel,
  products,
  viewAllHref,
  bgColor,
  Icon,
  bgImage,
  textColor,
  descriptionColor,
  timer,
  timerColor,
  type = "card",
}: IProps) {
  const primaryHex = bgColor ? getBgPrimaryHex(bgColor) : undefined;
  const resolvedTextColor =
    textColor ?? (primaryHex ? getContrastColor(primaryHex) : undefined);
  const resolvedDescriptionColor =
    descriptionColor ??
    (resolvedTextColor && primaryHex ? `${resolvedTextColor}b3` : undefined);

  const sectionBgStyle =
    type === "card" && bgColor
      ? getBgStyle(bgColor)
      : bgImage
        ? {
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : {};

  return (
    <section className={cn("mx-auto max-w-360 px-4 py-2", "md:px-6 md:py-3")}>
      <div
        className={cn(`rounded-md md:rounded-xl`, "md:p-5")}
        style={sectionBgStyle}
      >
        <ProductGroupHeader
          title={
            <span
              className={cn("flex items-center gap-2")}
              style={{ color: resolvedTextColor }}
            >
              {title}
              {Icon && <Icon weight="Bold" className="size-5" />}
            </span>
          }
          subtitle={subtitle}
          viewAllHref={viewAllHref}
          viewAllLabel={viewAllLabel}
          viewAllHiddenOnMobile={type === "card"}
          subTitleColor={resolvedDescriptionColor}
          timer={timer}
          timerColor={timerColor}
        />

        {type === "list" ? (
          <ProductGrid products={products} variant="secondary" />
        ) : (
          <>
            <div className="md:hidden">
              <ProductHorizontalList products={products} />
              <div className="px-3 pb-3">
                <Link
                  href={viewAllHref}
                  className={cn(
                    "mt-3 grid h-10.5 w-full place-items-center rounded-[12px] bg-foreground text-base font-semibold text-background hover:bg-foreground/90",
                  )}
                >
                  {viewAllLabel}
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <ProductGrid products={products} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
