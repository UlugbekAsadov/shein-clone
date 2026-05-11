interface IProps {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}

export function ContactItem({ icon, primary, secondary }: IProps) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-muted text-foreground">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-medium text-foreground">{primary}</span>
        <span className="text-xs text-muted-foreground">{secondary}</span>
      </span>
    </li>
  );
}
