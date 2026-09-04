"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/** Animates an integer from 0 up to `target` once it scrolls into view. */
export function useCountUp<T extends HTMLElement = HTMLElement>(target: number, duration = 1.6) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  return { ref, value };
}
