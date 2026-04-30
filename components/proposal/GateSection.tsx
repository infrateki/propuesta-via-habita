"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Check } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { GATE_CRITERIA } from "@/data/proposal";

export function GateSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="gate"
      num="08"
      eyebrow="Gate Go / No-Go · Fase 2"
      title={
        <>
          La Fase 2 se decide
          <br />
          <span className="text-steel-300">con criterios objetivos.</span>
        </>
      }
      lede="No con opinión ni intención. Si los criterios no se cumplen, el informe documenta las causas y proponemos ajustes, sin cobrar la Fase 2."
    >
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {GATE_CRITERIA.map((g, i) => (
          <motion.li
            key={g.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-[var(--color-steel-800)] p-6 lg:p-7 space-y-4 min-h-[200px] flex flex-col"
          >
            <div className="flex items-center gap-3">
              <span className="label-spec text-[var(--color-copper)]">
                G-0{i + 1}
              </span>
              <div className="size-5 rounded-full hairline-strong-t hairline-strong-b grid place-items-center">
                <Check
                  className="size-3 text-[var(--color-emerald)]"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <h3 className="text-steel-100 font-display text-lg leading-tight">
              {g.criterion}
            </h3>

            <p className="text-sm text-steel-400 leading-relaxed flex-1 hairline-t pt-3 mt-auto">
              <span className="label-spec text-steel-500 block mb-1">
                Condición GO
              </span>
              {g.goCondition}
            </p>
          </motion.li>
        ))}
      </ul>

      {/* Callout */}
      <motion.aside
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 material-glass-strong chrome-edge p-6 lg:p-8 flex items-start gap-5"
      >
        <div className="shrink-0 hairline rounded-[var(--radius-spec)] p-3">
          <ShieldCheck
            className="size-5 text-[var(--color-emerald)]"
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-1.5">
          <p className="label-spec text-[var(--color-emerald)]">
            Garantía contractual
          </p>
          <p className="text-steel-100 font-display text-lg md:text-xl leading-snug">
            No se cobra la Fase 2 si los criterios mínimos no se alcanzan.
          </p>
          <p className="text-sm text-steel-400 leading-relaxed">
            INFRATEK absorbe el costo de ajuste. La decisión de continuar es
            libre, no es dependencia. Es decisión informada de Habita.
          </p>
        </div>
      </motion.aside>
    </SectionShell>
  );
}
