import { ShoppingBag } from "lucide-react";

interface IProps {
  label: string;
  text: string;
  cta: string;
}

export function PromoBanner({ label, text, cta }: IProps) {
  return (
    <div className="mx-auto max-w-360 px-6 py-6">
      <div className="flex items-center justify-center gap-4 rounded-[18px] bg-foreground px-8 py-2.5 text-background">
        <ShoppingBag className="size-4" />
        <span className="text-sm font-bold uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm">{text}</span>
        <button
          type="button"
          className="text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
