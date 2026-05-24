import Image from "next/image";
import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IBanner } from "@/features/home/utils/banner.interface";

interface IProps {
  banner: IBanner;
  lang: (typeof locales)[number];
  priority?: boolean;
}

function getHref(
  banner: IBanner,
  lang: (typeof locales)[number],
): { href: string; external: boolean } | null {
  switch (banner.target_type) {
    case "web":
      return banner.target_id
        ? { href: banner.target_id, external: true }
        : null;
    case "category":
      return { href: `/${lang}/category/${banner.target_id}`, external: false };
    case "product":
      return { href: `/${lang}/product/${banner.target_id}`, external: false };
    case "shop":
      return { href: `/${lang}/shop/${banner.target_id}`, external: false };
    default:
      return null;
  }
}

export function BannerSlide({ banner, lang, priority }: IProps) {
  const target = getHref(banner, lang);
  const className =
    "relative block aspect-351/100 w-full shrink-0 grow-0 basis-full overflow-hidden rounded-[14px] md:aspect-1600/500";

  const image = (
    <Image
      src={banner.image_url}
      alt={banner.title}
      fill
      quality={95}
      className="object-cover"
      sizes="(max-width: 1440px) 100vw, 1440px"
      priority={priority}
    />
  );

  if (!target) {
    return <div className={className}>{image}</div>;
  }

  if (target.external) {
    return (
      <a
        href={target.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {image}
      </a>
    );
  }

  return (
    <Link href={target.href} className={className}>
      {image}
    </Link>
  );
}
