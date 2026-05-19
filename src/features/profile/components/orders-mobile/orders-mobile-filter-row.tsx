import { Checkbox } from "@/shared/components/ui/checkbox";

interface IProps {
  id: string;
  label: string;
  defaultChecked?: boolean;
}

export function OrdersMobileFilterRow({ id, label, defaultChecked }: IProps) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between py-4"
    >
      <span className="text-base text-foreground">{label}</span>
      <Checkbox
        id={id}
        defaultChecked={defaultChecked}
        className="size-6 rounded-md data-checked:bg-foreground data-checked:border-foreground data-checked:text-background"
      />
    </label>
  );
}
