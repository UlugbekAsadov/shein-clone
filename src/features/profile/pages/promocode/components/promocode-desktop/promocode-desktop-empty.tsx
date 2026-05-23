import Image from "next/image";

interface IProps {
  title: string;
  description: string;
}

export function PromocodeDesktopEmpty({ title, description }: IProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
      <Image
        src="/icons/promocode-empty-state.svg"
        alt=""
        width={180}
        height={180}
        priority
      />
      <h2 className="mt-3 text-lg font-bold text-foreground">{title}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
