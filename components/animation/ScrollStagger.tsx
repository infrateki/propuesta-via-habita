"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import {
  fadeRiseVariants,
  fadeSlideVariants,
  fadeInVariants,
  itemTransition,
  staggerContainer,
  STAGGER_GAP,
  STAGGER_INITIAL_DELAY,
  VIEWPORT_DEFAULT,
} from "./variants";

type StaggerMode = "rise" | "slide" | "fade";

type ContainerProps = {
  children: ReactNode;
  /** Gap between child reveals (seconds). Default: 0.06s. */
  gap?: number;
  /** Delay before first child starts (seconds). Default: 0.05s. */
  initialDelay?: number;
  margin?: string;
  as?: ElementType;
  className?: string;
};

type ItemProps = {
  children: ReactNode;
  mode?: StaggerMode;
  duration?: number;
  as?: ElementType;
  className?: string;
};

const ITEM_VARIANTS = {
  rise: fadeRiseVariants,
  slide: fadeSlideVariants,
  fade: fadeInVariants,
} as const;

/**
 * Wraps a list of `<ScrollStagger.Item>` children and reveals them in sequence
 * once the container enters the viewport. Children render statically when
 * the user has prefers-reduced-motion enabled.
 */
export function ScrollStagger({
  children,
  gap = STAGGER_GAP,
  initialDelay = STAGGER_INITIAL_DELAY,
  margin,
  as = "div",
  className,
}: ContainerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={margin ? { once: true, margin } : VIEWPORT_DEFAULT}
      variants={{
        hidden: staggerContainer.hidden,
        visible: {
          transition: {
            staggerChildren: gap,
            delayChildren: initialDelay,
          },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

function ScrollStaggerItem({
  children,
  mode = "rise",
  duration,
  as = "div",
  className,
}: ItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={ITEM_VARIANTS[mode]}
      transition={{ ...itemTransition, ...(duration ? { duration } : {}) }}
    >
      {children}
    </MotionTag>
  );
}

ScrollStagger.Item = ScrollStaggerItem;
