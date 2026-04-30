"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flag } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { TIMELINE } from "@/data/proposal";

export function TimelineSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="cronograma"
      num="05"
      eyebrow="Cronograma · 4 meses"
      title={
        <>
          Mayo a Agosto 2026.
          <br />
          <span className="text-steel-300">Hitos verificables.</span>
        </>
      }
      lede="Cada mes cierra con un entregable concreto que se aprueba antes del siguiente pago. Cuatro meses, cuatro hitos, cero ambigüedad."
    >
      {/* DESKTOP (horizontal) */}
      <div className="hidden lg:block">
        {/* spine */}
        <div className="relative grid grid-cols-4 gap-6">
          {/* horizontal rule */}
          <div
            aria-hidden
            className="absolute top-12 left-0 right-0 h-px bg-[var(--color-hairline-strong)]"
          />
          {TIMELINE.map((m, i) => (
            <motion.div
              key={m.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative space-y-5"
            >
              {/* node */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="size-6 rounded-full grid place-items-center material-steel chrome-edge">
                  <span className="text-[10px] font-mono text-steel-100">
                    {m.index}
                  </span>
                </div>
                <span className="label-spec text-steel-400">
                  Mes {m.index}
                </span>
              </div>

              {/* content */}
              <div className="hairline rounded-[var(--radius-card)] p-6 bg-[var(--color-steel-800)] space-y-4 min-h-[320px] flex flex-col">
                <div className="space-y-1">
                  <p className="label-spec text-[var(--color-copper)]">
                    {m.month} {m.year}
                  </p>
                  <h3 className="font-display text-steel-100 text-xl leading-tight">
                    {m.title}
                  </h3>
                </div>

                <ul className="space-y-2 text-sm text-steel-300 flex-1">
                  {m.activities.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span className="text-steel-500 leading-relaxed">·</span>
                      <span className="leading-relaxed">{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="hairline-t pt-4">
                  <div className="flex items-start gap-2">
                    <Flag
                      className="size-3.5 text-[var(--color-copper)] shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <p className="label-spec text-steel-200 leading-relaxed normal-case tracking-normal text-[11px]">
                      {m.milestone}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET (vertical) */}
      <ol className="lg:hidden space-y-5 relative">
        <div
          aria-hidden
          className="absolute left-3 top-3 bottom-3 w-px bg-[var(--color-hairline-strong)]"
        />
        {TIMELINE.map((m, i) => (
          <motion.li
            key={m.id}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative pl-10"
          >
            <div className="absolute left-0 top-0 size-6 rounded-full grid place-items-center material-steel chrome-edge">
              <span className="text-[10px] font-mono text-steel-100">
                {m.index}
              </span>
            </div>

            <div className="hairline rounded-[var(--radius-card)] p-5 bg-[var(--color-steel-800)] space-y-3">
              <div>
                <p className="label-spec text-[var(--color-copper)]">
                  {m.month} {m.year} · MES {m.index}
                </p>
                <h3 className="font-display text-steel-100 text-lg mt-1">
                  {m.title}
                </h3>
              </div>

              <ul className="space-y-1.5 text-sm text-steel-300">
                {m.activities.map((a) => (
                  <li key={a} className="flex items-start gap-2">
                    <span className="text-steel-500">·</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <div className="hairline-t pt-3 flex items-start gap-2">
                <Flag
                  className="size-3.5 text-[var(--color-copper)] shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-steel-300 font-spec leading-relaxed">
                  {m.milestone}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}
