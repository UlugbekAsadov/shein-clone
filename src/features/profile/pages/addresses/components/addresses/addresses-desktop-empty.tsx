import { MapPointWave } from "@solar-icons/react/ssr";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { EmptyStateIcon } from "@/shared/components/empty-state/empty-state-icon";

interface IProps {
  title: string;
  description: string;
}

export function AddressesDesktopEmpty({ title, description }: IProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      size="lg"
      className="min-h-[400px] py-12"
      media={
        <EmptyStateIcon
          icon={<MapPointWave className="relative size-24 text-muted-foreground" />}
        />
      }
    />
  );
}
