"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Animates an integer from 0 up to `target` once it scrolls into view.
 *
 * The initial state is always 0, never `target` — seeding it from
 * `useReducedMotion()` would render different text on the server than on a
 * reduced-motion client and trip a hydration error. The jump to the final
 * value happens in an effect instead, which runs after hydration.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(target: number, duration = 1.6) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration, reduce]);

  return { ref, value };
}
