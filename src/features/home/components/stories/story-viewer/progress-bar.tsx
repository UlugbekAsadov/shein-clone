"use client";

import { useEffect, useState } from "react";

interface IProps {
  status: "done" | "active" | "pending";
  active: boolean;
  resetKey: string;
  durationMs: number;
  isPaused: boolean;
}

export function ProgressBar({ status, active, resetKey, durationMs, isPaused }: IProps) {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!active || status !== "active") {
      setAnimating(false);
      return;
    }
    setAnimating(false);
    const id = requestAnimationFrame(() => setAnimating(true));
    return () => cancelAnimationFrame(id);
  }, [status, active, resetKey]);

  if (status === "done") {
    return (
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
        <div className="h-full w-full bg-white" />
      </div>
    );
  }

  if (status === "pending" || !animating) {
    return <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30" />;
  }

  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
      <div
        className="h-full origin-left bg-white"
        style={{
          animationName: "progress-fill",
          animationDuration: `${durationMs}ms`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      />
    </div>
  );
}
