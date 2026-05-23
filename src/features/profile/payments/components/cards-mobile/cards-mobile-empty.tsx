import Image from "next/image";

interface IProps {
  title: string;
  description: string;
}

export function CardsMobileEmpty({ title, description }: IProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <Image
        src="/icons/cards-empty-state.svg"
        alt=""
        width={150}
        height={150}
        priority
      />
      <h2 className="mt-2.5 text-sm font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-66.75 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
