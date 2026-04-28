"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { PLATFORMS, type Platform } from "@/data/platforms";
import { formatUSD, cn } from "@/lib/utils";

type Scale = "u5" | "u50";

const EXPENSIVE_THRESHOLD = 50_000;

/**
 * Horizontal bar chart of annual cost per platform.
 *
 * NOTE: spec called for `recharts`, but it's not in the dependency tree
 * (project uses @visx). A custom SVG/div bar fits the steel/spec
 * aesthetic better and keeps bundle size flat. Each bar animates from 0
 * width on scroll-into-view via framer-motion.
 */
export function CostChart() {
  const [scale, setScale] = useState<Scale>("u50");
  const reduce = useReducedMotion();

  const data = useMemo(() => {
    const arr = PLATFORMS.map((p) => ({
      ...p,
      cost: scale === "u5" ? p.cost5Users : p.cost50Users,
    })).filter((p) => typeof p.cost === "number") as (Platform & {
      cost: number;
    })[];

    arr.sort((a, b) => a.cost - b.cost);
    return arr;
  }, [scale]);

  const max = Math.max(...data.map((d) => d.cost));

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="label-spec text-[var(--color-copper)]">
            Visualización · Costo anual USD
          </p>
          <h3 className="font-display text-steel-100 text-display-md max-w-2xl">
            Lo que paga Habita,
            <br />
            <span className="text-steel-300">para el mismo alcance.</span>
          </h3>
        </div>

        {/* mini scale toggle (mirrors ComparisonTable) */}
        <div
          role="radiogroup"
          aria-label="Escala de comparación"
          className="hairline rounded-[var(--radius-spec)] p-1 flex items-center gap-1 bg-[var(--color-steel-800)]"
        >
          {(["u5", "u50"] as Scale[]).map((s) => {
            const active = s === scale;
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setScale(s)}
                className={cn(
                  "label-spec px-3 py-2.5 min-h-11 rounded-[var(--radius-spec)] transition-colors",
                  active
                    ? "bg-[var(--color-steel-600)] text-steel-100"
                    : "text-steel-400 hover:text-steel-200"
                )}
              >
                {s === "u5" ? "5 usuarios" : "50 usuarios"}
              </button>
            );
          })}
        </div>
      </div>

      {/* chart */}
      <div className="hairline rounded-[var(--radius-card)] p-4 sm:p-6 lg:p-8 bg-[var(--color-steel-800)] space-y-4">
        <ul className="space-y-3.5">
          {data.map((d, i) => {
            const widthPct = (d.cost / max) * 100;
            const tone: "us" | "ok" | "warn" = d.highlight
              ? "us"
              : d.cost > EXPENSIVE_THRESHOLD
              ? "warn"
              : "ok";

            return (
              <li
                key={d.id}
                className={cn(
                  "grid grid-cols-[96px_1fr_68px] sm:grid-cols-[140px_1fr_92px] md:grid-cols-[180px_1fr_140px] items-center gap-2 sm:gap-3 md:gap-5",
                  d.highlight && "relative"
                )}
              >
                {/* label */}
                <div className="min-w-0">
                  <p
                    className={cn(
                      "text-sm truncate font-display",
                      d.highlight
                        ? "text-[var(--color-electric)]"
                        : "text-steel-200"
                    )}
                  >
                    {d.name}
                  </p>
                </div>

                {/* bar track */}
                <div className="relative h-7 bg-[var(--color-steel-700)]/40 rounded-[2px] overflow-hidden hairline">
                  <motion.div
                    initial={reduce ? { width: `${widthPct}%` } : { width: 0 }}
                    whileInView={
                      reduce ? undefined : { width: `${widthPct}%` }
                    }
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{
                      duration: 1.0,
                      delay: reduce ? 0 : 0.1 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      "h-full rounded-[2px] relative",
                      tone === "us" &&
                        "bg-gradient-to-r from-[var(--color-electric)]/80 to-[var(--color-electric)]",
                      tone === "warn" &&
                        "bg-gradient-to-r from-[var(--color-warning)]/60 to-[var(--color-warning)]",
                      tone === "ok" &&
                        "bg-gradient-to-r from-[var(--color-steel-500)] to-[var(--color-steel-400)]"
                    )}
                  >
                    {tone === "us" ? (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 right-0 w-px bg-[var(--color-steel-100)]"
                      />
                    ) : null}
                  </motion.div>
                </div>

                {/* value */}
                <motion.span
                  initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                  whileInView={reduce ? undefined : { opacity: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : 0.5 + i * 0.06,
                    ease: "easeOut",
                  }}
                  className={cn(
                    "text-right font-spec text-spec-price tabular-nums text-sm",
                    tone === "us" && "text-[var(--color-electric)]",
                    tone === "warn" && "text-[var(--color-warning)]",
                    tone === "ok" && "text-steel-200"
                  )}
                >
                  {formatUSD(d.cost, { compact: true })}
                </motion.span>
              </li>
            );
          })}
        </ul>

        {/* legend */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 hairline-t pt-5">
          <LegendDot tone="us" label="VIA-HABITA" />
          <LegendDot tone="ok" label="Competidor — costo competitivo" />
          <LegendDot
            tone="warn"
            label={`Competidor — > ${formatUSD(EXPENSIVE_THRESHOLD, { compact: true })} / año`}
          />
        </div>
      </div>
    </div>
  );
}

function LegendDot({
  tone,
  label,
}: {
  tone: "us" | "ok" | "warn";
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={cn(
          "size-2.5 rounded-[1px]",
          tone === "us" && "bg-[var(--color-electric)]",
          tone === "ok" && "bg-[var(--color-steel-400)]",
          tone === "warn" && "bg-[var(--color-warning)]"
        )}
      />
      <span className="label-spec text-steel-400">{label}</span>
    </span>
  );
}
