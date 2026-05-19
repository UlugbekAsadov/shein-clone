import Image from "next/image";

interface IProps {
  title: string;
  description: string;
}

export function OrdersMobileEmpty({ title, description }: IProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
      <Image
        src="/icons/orders-empty-state.svg"
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
