import { cn } from "@/lib/utils";

interface IProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function FilterMobileSection({ title, children, className }: IProps) {
  return (
    <section className={cn("border-t border-border py-5", className)}>
      {title && (
        <h3 className="mb-4 text-base font-bold text-foreground">{title}</h3>
      )}
      {children}
    </section>
  );
}
