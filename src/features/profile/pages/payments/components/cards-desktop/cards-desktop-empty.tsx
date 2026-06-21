import Image from "next/image";
import { EmptyState } from "@/shared/components/empty-state/empty-state";

interface IProps {
  title: string;
  description: string;
}

export function CardsDesktopEmpty({ title, description }: IProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      size="lg"
      className="min-h-[400px]"
      media={
        <Image
          src="/icons/cards-empty-state.svg"
          alt=""
          width={180}
          height={180}
          priority
        />
      }
    />
  );
}
