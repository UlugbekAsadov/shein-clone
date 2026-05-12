interface IProps {
  title: string;
  description: string;
}

export function AboutStoreIntro({ title, description }: IProps) {
  return (
    <section className="rounded-md bg-secondary p-5">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-2.5  font-medium text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
