interface IProps {
  description: string;
}

export function ProductMobileDescription({ description }: IProps) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-bold text-foreground">Description:</h3>
      <div
        className="mt-2 text-xs leading-relaxed text-muted-foreground [&_p]:mb-2"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
