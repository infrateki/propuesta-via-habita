"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Section number stamp, e.g. "01", "02", "INV". */
  num: string;
  /** Short eyebrow label printed in mono caps next to the number. */
  eyebrow: string;
  /** Headline rendered as <h2>. */
  title: ReactNode;
  /** Optional sub-headline / dek. */
  lede?: ReactNode;
  /** Children render below the heading block. */
  children: ReactNode;
  /** Top border shows the section divider rule. */
  divider?: boolean;
  className?: string;
  /** id for in-page anchors. */
  id?: string;
};

/**
 * Shared wrapper for every /propuesta section.
 * - Spec-sheet number + eyebrow + hairline rule (matches home page §00 stamp).
 * - Scroll-triggered fade/rise via framer-motion (respects prefers-reduced-motion).
 * - Generous vertical rhythm, full-width canvas, max-w-7xl content.
 */
export function SectionShell({
  num,
  eyebrow,
  title,
  lede,
  children,
  divider = true,
  className,
  id,
}: Props) {
  const reduce = useReducedMotion();

  const fade = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-15% 0px -10% 0px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <section
      id={id}
      className={cn(divider && "hairline-t", "relative", className)}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
        <motion.div {...fade} className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="label-spec text-[var(--color-copper)]">§{num}</span>
            <span className="hairline-l h-3" />
            <span className="label-spec">{eyebrow}</span>
          </div>

          <h2 className="text-display-lg text-steel-100 font-display max-w-4xl">
            {title}
          </h2>

          {lede ? (
            <p className="text-steel-300 text-lg max-w-2xl leading-relaxed">
              {lede}
            </p>
          ) : null}
        </motion.div>

        <div className="mt-16">{children}</div>
      </div>
    </section>
  );
}
