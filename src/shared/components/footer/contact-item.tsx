interface IProps {
  icon: React.ReactNode;
  primary: string;
  secondary: string;
}

export function ContactItem({ icon, primary, secondary }: IProps) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-10.5 bg-white shrink-0 place-items-center rounded-[8px] text-foreground">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{primary}</span>
        <span className="text-sm font-medium text-muted-foreground">
          {secondary}
        </span>
      </span>
    </li>
  );
}
