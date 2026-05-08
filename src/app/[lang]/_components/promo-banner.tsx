import { ShoppingBag } from "lucide-react";

type Props = {
  label: string;
  text: string;
  cta: string;
};

export function PromoBanner({ label, text, cta }: Props) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="flex items-center justify-center gap-4 rounded-full bg-foreground px-8 py-3.5 text-background">
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
