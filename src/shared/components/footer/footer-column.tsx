interface IProps {
  title: string;
  items: string[];
}

export function FooterColumn({ title, items }: IProps) {
  return (
    <div>
      <h4 className="mb-4.5 text-sm font-bold tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="space-y-4.5">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-secondary-foreground transition-colors hover:text-foreground"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
