interface IProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureItem({ icon, title, description }: IProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-background feature-item">
      <span className="grid size-16 place-items-center rounded-sm bg-muted text-foreground">
        {icon}
      </span>
      <div>
        <h4 className="text-sm font-semibold">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
