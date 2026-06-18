interface IProps {
  title: string;
  description: string;
}

export function AboutStoreIntro({ title, description }: IProps) {
  return (
    <section className="rounded-md bg-secondary p-5">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div
        className="prose prose-sm mt-2.5 max-w-none font-medium text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
}
