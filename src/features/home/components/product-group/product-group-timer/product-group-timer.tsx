"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ProductGroupTimerTile } from "./product-group-timer-tile";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function getSecondsLeft(targetMs: number) {
  const diff = Math.floor((targetMs - Date.now()) / 1000);
  return diff > 0 ? diff : 0;
}

interface IProps {
  timer: number;
  color?: string;
}

export function ProductGroupTimer({ timer, color }: IProps) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    setSecondsLeft(getSecondsLeft(timer));
    const id = setInterval(() => {
      setSecondsLeft(getSecondsLeft(timer));
    }, 1000);
    return () => clearInterval(id);
  }, [timer]);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;

  return (
    <div className="flex items-center gap-1">
      <ProductGroupTimerTile value={pad(h)} color={color} />
      <div className={cn("flex flex-col gap-1", "md:gap-1.5")}>
        <span
          className={cn(
            "size-0.5 rounded-[8px] bg-white",
            "md:size-1 md:rounded-[10px]",
          )}
        />
        <span
          className={cn(
            "size-0.5 rounded-[8px] bg-white",
            "md:size-1 md:rounded-[10px]",
          )}
        />
      </div>
      <ProductGroupTimerTile value={pad(m)} color={color} />
      <div className={cn("flex flex-col gap-1", "md:gap-1.5")}>
        <span
          className={cn(
            "size-0.5 rounded-[8px] bg-white",
            "md:size-1 md:rounded-[10px]",
          )}
        />
        <span
          className={cn(
            "size-0.5 rounded-[8px] bg-white",
            "md:size-1 md:rounded-[10px]",
          )}
        />
      </div>
      <ProductGroupTimerTile value={pad(s)} color={color} />
    </div>
  );
}
