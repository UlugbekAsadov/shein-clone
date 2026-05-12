import { productCountMock } from "@/shared/constants/listing.constants";

interface IProps {
  title: string;
  subtitle: string;
  productFoundLabel: string;
}

export function ListingPageHeader({
  title,
  subtitle,
  productFoundLabel,
}: IProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <p className="mt-1 flex items-center gap-1 text-sm">
        <span className="text-muted-foreground">{productFoundLabel}:</span>
        <span className="font-semibold">{productCountMock}</span>
      </p>
    </div>
  );
}
