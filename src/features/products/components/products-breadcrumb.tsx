"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { IApiFilterCategoryNode } from "@/types/filter-options.interface";

interface IProps {
  homeLabel: string;
  title: string;
  lang: string;
  categories?: IApiFilterCategoryNode[];
}

function findCategoryTrail(
  nodes: IApiFilterCategoryNode[],
  targetId: number,
  trail: IApiFilterCategoryNode[] = [],
): IApiFilterCategoryNode[] | null {
  for (const node of nodes) {
    const next = [...trail, node];
    if (node.id === targetId) return next;
    if (node.children?.length) {
      const found = findCategoryTrail(node.children, targetId, next);
      if (found) return found;
    }
  }
  return null;
}

export function ProductsBreadcrumb({
  homeLabel,
  title,
  lang,
  categories = [],
}: IProps) {
  const searchParams = useSearchParams();
  const categoryIdRaw = searchParams.get("category_ids")?.split(",")[0];
  const categoryId = categoryIdRaw ? Number(categoryIdRaw) : null;
  const trail = categoryId ? findCategoryTrail(categories, categoryId) : null;
  const crumbs = trail && trail.length > 0 ? trail.map((n) => n.name) : [title];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link
            href={`/${lang}/demo`}
            className="hover:text-foreground transition-colors"
          >
            {homeLabel}
          </Link>
          <span aria-hidden>/</span>
        </li>
        {crumbs.map((name, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li
              key={`${name}-${index}`}
              className="flex items-center gap-1.5"
            >
              <span className={cn(isLast && "text-foreground")}>{name}</span>
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
