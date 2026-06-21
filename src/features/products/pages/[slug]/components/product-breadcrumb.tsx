import type { IProductBreadcrumbItem } from "@/features/products/pages/[slug]/utils/breadcrumb.interface";

interface IProps {
  items: IProductBreadcrumbItem[];
}

export function ProductBreadcrumb({ items }: IProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.id} className="flex items-center gap-1.5">
              <span
                className={
                  isLast
                    ? "max-w-[480px] truncate text-foreground"
                    : "hover:text-foreground"
                }
              >
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
