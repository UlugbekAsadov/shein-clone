interface IProps {
  totalLabel: string;
}

export function CommentsHeader({ totalLabel }: IProps) {
  return (
    <h1 className="text-2xl font-bold">Customer Reviews ({totalLabel})</h1>
  );
}
