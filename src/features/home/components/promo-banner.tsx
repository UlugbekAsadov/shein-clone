import { Bag4 } from "@solar-icons/react/ssr";

interface IProps {
  label: string;
  text: string;
  cta: string;
}

export function PromoBanner({ label, text, cta }: IProps) {
  return (
    <div className="mx-auto max-w-360 px-6 py-6 ">
      <div className="flex items-center justify-center gap-4 cursor-pointer rounded-[18px] bg-foreground px-8 py-2.5 text-background">
        <div className="flex items-center gap-1.5">
          <Bag4 className="size-4.5" weight="Bold" />
          <span className="text-sm font-bold uppercase tracking-wider">
            {label}
          </span>
        </div>
        <span className="text-sm">{text}</span>
        <button
          type="button"
          className="text-sm font-bold text-[#ECBB0D] transition-colors"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}
