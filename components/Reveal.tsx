"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode, CSSProperties, ElementType } from "react";
import { easeOut } from "@/lib/motion";

/**
 * Reveal primitives.
 *
 * The site's scroll language is built on two moves, not fifteen:
 *
 *   1. MaskReveal — a line of type rises out of an overflow-hidden box, as if
 *      it were being uncovered. This is what gives headings weight; a plain
 *      opacity fade reads cheap next to it.
 *   2. Rise — a soft fade-and-lift for body copy, cards and lists.
 *
 * Two implementation notes, both the result of real bugs:
 *
 * • The observer sits on the OUTER element, never the animated one. A
 *   MaskReveal's inner span starts translated fully below its clipping
 *   parent, so its clipped intersection rect is zero-area — an observer
 *   attached to it would never fire and the text would stay hidden forever.
 *
 * • Nothing here branches its markup on `useReducedMotion()`. That value is
 *   false during server rendering and true on a client that asks for reduced
 *   motion, so branching on it produced a different DOM on each side and
 *   threw hydration errors for exactly the users it was meant to help.
 *   Reduced motion is handled entirely in CSS instead (see globals.css:
 *   `[data-reveal]` is forced to its final state), plus MotionConfig
 *   `reducedMotion="user"` so Framer skips the work as well.
 */

const VIEWPORT_MARGIN = "0px 0px -90px 0px";

type MaskRevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  as?: ElementType;
  style?: CSSProperties;
  className?: string;
  /** Extra bottom padding inside the clipping box, for descenders (g, y, ß). */
  bleed?: number;
};

export function MaskReveal({
  children,
  delay = 0,
  duration = 1.05,
  as: Tag = "span",
  style,
  className,
  bleed = 10,
}: MaskRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: "block", overflow: "hidden", paddingBottom: bleed, marginBottom: -bleed, ...style }}
    >
      <motion.span
        data-reveal=""
        style={{ display: "block", willChange: "transform" }}
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : { y: "115%" }}
        transition={{ duration, delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

/**
 * A heading split into pre-defined lines, each on its own mask reveal with a
 * short cascade. Lines are authored explicitly rather than measured at
 * runtime — no layout thrash, and the line breaks are art-directed instead
 * of accidental.
 */
export function MaskLines({
  lines,
  delay = 0,
  stagger: step = 0.1,
  duration = 1.05,
  style,
  className,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  delay?: number;
  stagger?: number;
  duration?: number;
  style?: CSSProperties;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        <MaskReveal key={i} delay={delay + i * step} duration={duration}>
          {line}
        </MaskReveal>
      ))}
    </Tag>
  );
}

/** Soft fade-and-lift. The workhorse for body copy and cards. */
export function Rise({
  children,
  delay = 0,
  y = 26,
  duration = 0.9,
  style,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  style?: CSSProperties;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: VIEWPORT_MARGIN });

  // A plain wrapper carries the ref; the motion element inside does the work.
  // Keeping `as` free-form this way avoids calling motion() during render,
  // which would mint a new component type each pass and remount the subtree.
  return (
    <Tag ref={ref} className={className} style={style}>
      <motion.div
        data-reveal=""
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0, y }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
        transition={{ duration, delay, ease: easeOut }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}

/**
 * Container that cascades its <RiseItem> children as they enter view.
 * Used for card grids and editorial lists.
 */
export function RiseGroup({
  children,
  stagger: step = 0.09,
  delay = 0,
  style,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export const riseItem = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
};

export function RiseItem({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <motion.div data-reveal="" className={className} style={style} variants={riseItem}>
      {children}
    </motion.div>
  );
}
