import Link from "next/link";

interface IProps {
  title: string;
  lang: string;
}

export function CategoryBreadcrumb({ title, lang }: IProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link
            href={`/${lang}/demo`}
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span aria-hidden>/</span>
        </li>
        <li className="text-foreground">{title}</li>
      </ol>
    </nav>
  );
}
