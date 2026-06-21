import type { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
}

export function EmptyStateIcon({ icon }: IProps) {
  return (
    <div className="relative grid size-44 place-items-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-secondary/60"
      />
      {icon}
    </div>
  );
}
