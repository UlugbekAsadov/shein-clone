interface IProps {
  title: string;
  items: string[];
}

export function FooterColumn({ title, items }: IProps) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
