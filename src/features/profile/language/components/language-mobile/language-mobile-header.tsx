import Link from "next/link";
import { ArrowLeft } from "@solar-icons/react/ssr";

interface IProps {
  title: string;
  backHref: string;
}

export function LanguageMobileHeader({ title, backHref }: IProps) {
  return (
    <div className="sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3 px-4 py-3">
        <Link
          href={backHref}
          aria-label="Go back"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
        >
          <ArrowLeft className="size-6" />
        </Link>

        <h1 className="flex-1 pr-10 text-center text-lg font-bold text-foreground">
          {title}
        </h1>
      </div>
    </div>
  );
}
