"use client";

import { useEffect, useState } from "react";
import { STRIP_DURATION_MS } from "../../_lib/constants/brand-story.constants";

interface IProps {
  status: "done" | "active" | "pending";
  active: boolean;
  resetKey: string;
}

export function ProgressBar({ status, active, resetKey }: IProps) {
  const [filled, setFilled] = useState(status === "done");

  useEffect(() => {
    if (!active) {
      setFilled(false);
      return;
    }
    if (status === "active") {
      setFilled(false);
      const id = requestAnimationFrame(() => setFilled(true));
      return () => cancelAnimationFrame(id);
    }
    setFilled(status === "done");
  }, [status, active, resetKey]);

  return (
    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
      <div
        className="h-full origin-left bg-white"
        style={{
          transform: `scaleX(${filled ? 1 : 0})`,
          transition:
            status === "active" && active
              ? `transform ${STRIP_DURATION_MS}ms linear`
              : "none",
        }}
      />
    </div>
  );
}
