import { AltArrowRight } from "@solar-icons/react/ssr";
import type { IAddress } from "@/features/profile/interfaces/address.interface";
import { AddressTypeIcon } from "@/features/profile/components/addresses-mobile/address-type-icon";

interface IProps {
  address: IAddress;
  onClick?: () => void;
}

export function AddressDesktopRow({ address, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-secondary p-4 text-left transition-colors hover:bg-secondary/80"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-background text-foreground">
        <AddressTypeIcon type={address.type} className="size-6" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold text-foreground">
          {address.title}
        </p>
        <p className="truncate text-sm text-muted-foreground">
          {address.details}
        </p>
      </div>

      <AltArrowRight className="size-6 shrink-0 text-foreground" />
    </button>
  );
}
