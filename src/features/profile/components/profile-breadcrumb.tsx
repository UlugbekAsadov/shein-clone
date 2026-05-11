import Link from "next/link";
import type { locales } from "@/core/config/i18n/i18n-config";
import type { IDictionary } from "@/core/config/i18n/dictionaries";

interface IProps {
  lang: (typeof locales)[number];
  dict: IDictionary;
  sectionLabel: string;
}

export function ProfileBreadcrumb({ lang, dict, sectionLabel }: IProps) {
  const trail = [
    { id: "home", label: dict.breadcrumb.home, href: `/${lang}` },
    {
      id: "profile",
      label: dict.breadcrumb.profile,
      href: `/${lang}/profile/account`,
    },
    { id: "section", label: sectionLabel },
  ];

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {trail.map((item, idx) => {
          const isLast = idx === trail.length - 1;
          return (
            <li key={item.id} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground" : ""}>
                  {item.label}
                </span>
              )}
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
