"use client";

import { useEffect, useState } from "react";
import { HotDealsTimerTile } from "./hot-deals-timer-tile";
import { cn } from "@/lib/utils";

const INITIAL_SECONDS = 24 * 3600 + 12 * 60 + 30;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function HotDealsTimer() {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

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
    <div className="flex items-center gap-1">
      <HotDealsTimerTile value={pad(h)} />
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
      <HotDealsTimerTile value={pad(m)} />
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
      <HotDealsTimerTile value={pad(s)} />
    </div>
  );
}
