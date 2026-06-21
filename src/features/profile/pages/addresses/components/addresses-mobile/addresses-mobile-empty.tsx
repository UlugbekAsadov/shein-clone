import { MapPointWave } from "@solar-icons/react/ssr";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { EmptyStateIcon } from "@/shared/components/empty-state/empty-state-icon";

interface IProps {
  title: string;
  description: string;
}

export function AddressesMobileEmpty({ title, description }: IProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      size="lg"
      className="flex-1 pb-32"
      media={
        <EmptyStateIcon
          icon={<MapPointWave className="relative size-24 text-muted-foreground" />}
        />
      }
    />
  );
}
