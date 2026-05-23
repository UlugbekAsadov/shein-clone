import { breadcrumbTrail } from "@/features/category/[slug]/mocks/breadcrumb.mocks";

export function CategoryBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground font-medium">
        {breadcrumbTrail.map((item, idx) => {
          const isLast = idx === breadcrumbTrail.length - 1;
          return (
            <li key={item.id} className="flex items-center gap-1.5">
              <span className={isLast ? "text-foreground" : ""}>
                {item.label}
              </span>
              {!isLast && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
