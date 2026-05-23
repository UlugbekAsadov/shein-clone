import { MapPointWave } from "@solar-icons/react/ssr";

interface IProps {
  title: string;
  description: string;
}

export function AddressesDesktopEmpty({ title, description }: IProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="relative grid size-44 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-secondary/60"
        />
        <MapPointWave className="relative size-24 text-muted-foreground" />
      </div>
      <h2 className="mt-2 text-lg font-bold text-foreground">{title}</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
