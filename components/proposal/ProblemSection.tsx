"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { PROBLEMS } from "@/data/proposal";
import { cn } from "@/lib/utils";

export function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="problema"
      num="01"
      eyebrow="El problema"
      title={
        <>
          Sin un sistema único,
          <br />
          <span className="text-steel-300">cada proyecto reinventa el control.</span>
        </>
      }
      lede="Seis hallazgos del Diagnóstico BIM 2.0 (+50 horas, +20 participantes, octubre–diciembre 2025) que la Fase 1 elimina."
    >
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {PROBLEMS.map((p, i) => (
          <motion.li
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "group relative bg-[var(--color-steel-800)]",
              "p-6 lg:p-8 flex flex-col gap-4 min-h-[260px]",
              "transition-colors duration-300",
              "hover:bg-[var(--color-steel-700)]"
            )}
          >
            <div className="flex items-start justify-between">
              <span className="label-spec text-steel-500">P-0{i + 1}</span>
              <AlertTriangle
                className="size-4 text-[var(--color-warning)] opacity-70 group-hover:opacity-100 transition-opacity"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-xl text-steel-100 font-display leading-tight">
              {p.title}
            </h3>

            <p className="text-sm text-steel-300 leading-relaxed flex-1">
              {p.impact}
            </p>

            {p.metric ? (
              <div className="hairline-t pt-4 mt-2">
                <p className="label-spec text-[var(--color-warning)]">
                  {p.metric}
                </p>
              </div>
            ) : null}
          </motion.li>
        ))}
      </ul>
    </SectionShell>
  );
}
