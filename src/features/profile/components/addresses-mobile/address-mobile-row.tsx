import { AltArrowRight } from "@solar-icons/react/ssr";
import type { IAddress } from "@/features/profile/interfaces/address.interface";
import { AddressTypeIcon } from "./address-type-icon";

interface IProps {
  address: IAddress;
  onClick?: () => void;
}

export function AddressMobileRow({ address, onClick }: IProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[18px] bg-secondary p-3 text-left active:bg-secondary/80"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-background text-foreground">
        <AddressTypeIcon type={address.type} className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">
          {address.name}
        </p>
        <p className="truncate text-xs font-medium text-muted-foreground">
          {address.address}
        </p>
      </div>

      <AltArrowRight className="size-6 shrink-0 text-foreground" />
    </button>
  );
}
