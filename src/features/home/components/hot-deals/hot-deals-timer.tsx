"use client";

import { useEffect, useState } from "react";
import { HotDealsTimerTile } from "./hot-deals-timer-tile";

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
      <div className="flex flex-col gap-1.5">
        <span className="size-1 rounded-[10px] bg-white" />
        <span className="size-1 rounded-[10px] bg-white" />
      </div>
      <HotDealsTimerTile value={pad(m)} />
      <div className="flex flex-col gap-1.5">
        <span className="size-1 rounded-[10px] bg-white" />
        <span className="size-1 rounded-[10px] bg-white" />
      </div>
      <HotDealsTimerTile value={pad(s)} />
    </div>
  );
}
