interface IProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function SocialLink({ href, label, icon }: IProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="mt-0.5 grid size-10.5 bg-white shrink-0 place-items-center rounded-[8px] text-foreground"
    >
      {icon}
    </a>
  );
}
