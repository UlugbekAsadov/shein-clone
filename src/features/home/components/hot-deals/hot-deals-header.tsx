import { FlameSolid } from "@/shared/components/icons/solid";
import { AltArrowRight } from "@solar-icons/react";
import { useEffect, useState } from "react";

interface IProps {
  title: string;
  subtitle: string;
  viewAllLabel: string;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export const HotDealsHeader = ({ title, subtitle, viewAllLabel }: IProps) => {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 24 * 60 + 12);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  return (
    <div className={"mb-4 flex items-center justify-between gap-4"}>
      <div className="flex items-center">
        <div>
          <h2 className="text-xl font-bold leading-tight">
            <span className="flex items-center gap-1 text-white">
              {title}
              <FlameSolid className="size-6" />
            </span>
          </h2>
          <p className="text-xs text-secondary mt-0.5">{subtitle}</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-normal ml-4">
          {[h, m, s].map((v, i) => (
            <span
              key={i}
              className="grid h-7 min-w-7 place-items-center rounded-md bg-foreground px-1.5 font-mono text-xs font-bold text-background"
            >
              {pad(v)}
            </span>
          ))}
        </span>
      </div>
      <a
        href="#"
        className="hidden items-center gap-1 text-sm font-medium text-white md:inline-flex"
      >
        {viewAllLabel}
        <AltArrowRight className="size-4" />
      </a>
    </div>
  );
};
