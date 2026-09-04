/**
 * The site's single easing curve.
 *
 * Everything that moves uses this one out-expo-ish curve: fast to start,
 * long settle. Using one curve everywhere is what makes the motion read as
 * a house style rather than a pile of separate effects.
 *
 * The reveal components in components/Reveal.tsx are the only place motion
 * should be authored from; import from there rather than rolling new
 * variants per section.
 */
export const easeOut = [0.16, 1, 0.3, 1] as const;

/** Default gap between cascading children in a RiseGroup. */
export const stagger = 0.09;
