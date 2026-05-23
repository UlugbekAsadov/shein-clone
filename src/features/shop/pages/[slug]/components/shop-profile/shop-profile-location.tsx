import { UzbekistanFlagIcon } from "@/shared/components/icons/outline";
import { TruckIconSolid } from "@/shared/components/icons/solid";

interface IProps {
  countryLabel: string;
  shipsFrom: string;
}

export function ShopProfileLocation({
  countryLabel,
  shipsFrom,
}: IProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-secondary-foreground">
      <span className="flex items-center gap-2">
        <UzbekistanFlagIcon className="size-5" />
        <span className="font-medium">{countryLabel}</span>
      </span>
      <span className="flex items-center gap-2">
        <TruckIconSolid className="size-5 fill-secondary-foreground" />
        <span className="font-medium">{shipsFrom}</span>
      </span>
    </div>
  );
}
