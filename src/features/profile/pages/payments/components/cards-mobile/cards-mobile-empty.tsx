import Image from "next/image";
import { EmptyState } from "@/shared/components/empty-state/empty-state";

interface IProps {
  title: string;
  description: string;
}

export function CardsMobileEmpty({ title, description }: IProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      size="sm"
      className="flex-1"
      media={
        <Image
          src="/icons/cards-empty-state.svg"
          alt=""
          width={150}
          height={150}
          priority
        />
      }
    />
  );
}
