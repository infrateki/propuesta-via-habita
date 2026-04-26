import type { Transition, Variants } from "framer-motion";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const REVEAL_DURATION = 0.5;
export const STAGGER_GAP = 0.1;
export const STAGGER_INITIAL_DELAY = 0.05;

export const VIEWPORT_DEFAULT = {
  once: true,
  margin: "-12% 0px -8% 0px",
} as const;

export const VIEWPORT_TIGHT = {
  once: true,
  margin: "-5% 0px",
} as const;

export const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const fadeSlideVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_GAP,
      delayChildren: STAGGER_INITIAL_DELAY,
    },
  },
};

export const revealTransition: Transition = {
  duration: REVEAL_DURATION,
  ease: EASE_OUT_EXPO,
};

export const itemTransition: Transition = {
  duration: 0.5,
  ease: EASE_OUT_EXPO,
};
