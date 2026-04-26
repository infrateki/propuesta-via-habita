"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import {
  fadeRiseVariants,
  fadeSlideVariants,
  fadeInVariants,
  revealTransition,
  VIEWPORT_DEFAULT,
} from "./variants";

type RevealMode = "rise" | "slide" | "fade";

type Props = {
  children: ReactNode;
  /** Animation style. Default: "rise" (24px Y, fade) */
  mode?: RevealMode;
  /** Stagger delay in seconds (added to base transition delay). */
  delay?: number;
  /** Override base duration (default: 0.7s). */
  duration?: number;
  /** Override viewport margin (default: -12%/-8%). */
  margin?: `${string}px` | `${string}%` | string;
  /** Render as a different element (default: div). */
  as?: ElementType;
  className?: string;
} & Omit<MotionProps, "initial" | "whileInView" | "viewport" | "transition">;

const VARIANTS = {
  rise: fadeRiseVariants,
  slide: fadeSlideVariants,
  fade: fadeInVariants,
} as const;

export function ScrollReveal({
  children,
  mode = "rise",
  delay = 0,
  duration,
  margin,
  as = "div",
  className,
  ...rest
}: Props) {
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
      viewport={
        margin ? { once: true, margin } : VIEWPORT_DEFAULT
      }
      variants={VARIANTS[mode]}
      transition={{
        ...revealTransition,
        ...(duration ? { duration } : {}),
        delay,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
