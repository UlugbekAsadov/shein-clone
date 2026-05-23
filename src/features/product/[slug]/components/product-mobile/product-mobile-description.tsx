interface IProps {
  description: string;
}

export function ProductMobileDescription({ description }: IProps) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-foreground">Description:</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
