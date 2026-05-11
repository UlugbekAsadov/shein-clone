interface IProps {
  title: string;
  description: string;
}

export function AboutStoreIntro({ title, description }: IProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </section>
  );
}
