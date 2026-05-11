interface IProps {
  countryFlag: string;
  countryLabel: string;
  shipsFrom: string;
}

export function ShopProfileLocation({
  countryFlag,
  countryLabel,
  shipsFrom,
}: IProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="text-base leading-none">
          {countryFlag}
        </span>
        <span>{countryLabel}</span>
      </span>
      <span>{shipsFrom}</span>
    </div>
  );
}
