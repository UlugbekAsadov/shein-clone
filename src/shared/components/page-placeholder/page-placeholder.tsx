import type { ComponentType } from "react";
import type { IconProps } from "@solar-icons/react";

interface IProps {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export function PagePlaceholder({ icon: Icon, title, description }: IProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-muted text-muted-foreground shadow-sm">
        <Icon weight="Bold" className="size-9" />
      </span>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
