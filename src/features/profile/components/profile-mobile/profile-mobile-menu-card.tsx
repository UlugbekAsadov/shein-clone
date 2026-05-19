import { cn } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export function ProfileMobileMenuCard({ children, className }: IProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] bg-secondary [&>*+*]:border-t [&>*+*]:border-border/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
