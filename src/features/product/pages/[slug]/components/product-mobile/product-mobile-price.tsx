interface IProps {
  price: number;
  originalPrice?: number;
  saveLabel?: string;
}

export function ProductMobilePrice({
  price,
  originalPrice,
  saveLabel,
}: IProps) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <span className="text-2xl font-bold text-foreground">
        {price.toFixed(1)}$
      </span>
      {originalPrice && (
        <span className="text-base text-muted-foreground line-through">
          {originalPrice.toFixed(1)}$
        </span>
      )}
      {saveLabel && (
        <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          {saveLabel}
        </span>
      )}
    </div>
  );
}
