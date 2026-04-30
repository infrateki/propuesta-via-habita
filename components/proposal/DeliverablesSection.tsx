"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, FileCheck } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { DELIVERABLES } from "@/data/proposal";

export function DeliverablesSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="entregables"
      num="03"
      eyebrow="9 entregables"
      title={
        <>
          Lo que se queda
          <br />
          <span className="text-steel-300">con Habita.</span>
        </>
      }
      lede="Documentos formales, modelo federado y plataforma operativa. Cada entregable se aprueba antes del pago del hito correspondiente."
    >
      <ol className="hairline rounded-[var(--radius-card)] overflow-hidden">
        {DELIVERABLES.map((d, i) => (
          <motion.li
            key={d.code}
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] gap-4 md:gap-6 items-baseline px-6 lg:px-8 py-5 hairline-b last:border-b-0 hover:bg-[var(--color-steel-700)]/40 transition-colors"
          >
            <span
              className="label-spec text-[var(--color-copper)] tabular-nums"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {d.code}
            </span>

            <h3 className="text-steel-100 font-display text-base md:text-lg leading-tight">
              {d.name}
            </h3>

            <span className="hidden md:inline label-spec text-steel-400">
              {d.format}
            </span>

            <span className="hidden md:inline-flex items-center gap-1.5 label-spec text-steel-300">
              <CheckCircle2 className="size-3.5 text-[var(--color-emerald)]" strokeWidth={2} />
              {d.approver}
            </span>

            {/* mobile meta row */}
            <div className="md:hidden col-span-2 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
              <span className="label-spec text-steel-500">{d.format}</span>
              <span className="label-spec text-steel-300 inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-3 text-[var(--color-emerald)]" strokeWidth={2} />
                {d.approver}
              </span>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Callout (todos llevan el logo de Habita) */}
      <motion.aside
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 material-glass-strong chrome-edge p-6 lg:p-8 flex items-start gap-5"
      >
        <div className="shrink-0 hairline rounded-[var(--radius-spec)] p-3">
          <FileCheck
            className="size-5 text-[var(--color-copper)]"
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-1.5">
          <p className="label-spec text-[var(--color-copper)]">Garantía de propiedad</p>
          <p className="text-steel-100 font-display text-lg md:text-xl leading-snug">
            Todos llevan el logo de Habita. Son de Habita.
          </p>
          <p className="text-sm text-steel-400 leading-relaxed">
            Si Habita decide continuar sin INFRATEK, retiene todos los documentos,
            el código y los datos. Sin cláusula de retención.
          </p>
        </div>
      </motion.aside>
    </SectionShell>
  );
}
