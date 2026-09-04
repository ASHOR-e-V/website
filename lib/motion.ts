// Shared scroll-reveal presets — used across the site for a consistent,
// restrained "fade up as you scroll" language (no scroll-jacking, no
// gimmicks — just generous timing and a soft easing curve).

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = (delay = 0, y = 28, duration = 0.9) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration, delay, ease: easeOut },
});

export const fadeIn = (delay = 0, duration = 1) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration, delay, ease: easeOut },
});

// For staggered card/list grids: pass index * stagger as the delay.
export const stagger = 0.09;
