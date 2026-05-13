"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface IScrollEdges<T extends HTMLElement> {
  ref: RefObject<T | null>;
  atStart: boolean;
  atEnd: boolean;
}

export function useScrollEdges<T extends HTMLElement>(): IScrollEdges<T> {
  const ref = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  return { ref, atStart, atEnd };
}
