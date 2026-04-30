"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Telescope } from "lucide-react";
import { SectionShell } from "./SectionShell";

const HORIZONS: { title: string; description: string }[] = [
  {
    title: "Toda la cartera, no sólo 6",
    description: "VIA-HABITA escala a la cartera completa con la misma metodología.",
  },
  {
    title: "Ciclo de vida completo",
    description: "Diseño → construcción → venta → postventa, en una sola línea.",
  },
  {
    title: "Postventa digital",
    description: "Digital twin del departamento entregado para cliente y administración.",
  },
  {
    title: "Entregas oficiales",
    description: "Recepción municipal (DOM), bomberos, traspaso a la administración.",
  },
];

export function VisionSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="vision"
      num="09"
      eyebrow="Horizonte"
      title={
        <>
          La Fase 1 es el cimiento.
          <br />
          <span className="text-steel-300">Lo que se construye encima es de Habita.</span>
        </>
      }
      lede="Esto no es alcance contratado de Fase 1 — es la dirección que justifica construir la base bien."
    >
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Pablo quote anchor */}
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 material-glass-strong chrome-edge p-7 lg:p-8 flex items-start gap-4"
        >
          <Telescope
            className="size-4 text-[var(--color-copper)] shrink-0 mt-1.5"
            strokeWidth={1.5}
          />
          <div className="space-y-3">
            <blockquote className="font-display text-steel-100 text-lg lg:text-xl leading-snug">
              &ldquo;Esa es la idea… todos los planos de construcción, todos los
              planos de cliente, todo es lo mismo.&rdquo;
            </blockquote>
            <figcaption className="label-spec text-steel-400">
              — Pablo Otero · 29 abril 2026
            </figcaption>
          </div>
        </motion.figure>

        {/* Compact horizons list */}
        <ul className="lg:col-span-7 hairline rounded-[var(--radius-card)] bg-[var(--color-steel-800)] divide-y divide-[var(--color-hairline)]">
          {HORIZONS.map((h, i) => (
            <motion.li
              key={h.title}
              initial={reduce ? false : { opacity: 0, x: -12 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5% 0px" }}
              transition={{
                duration: 0.4,
                delay: reduce ? 0 : i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-[auto_1fr] gap-4 px-5 lg:px-6 py-4"
            >
              <span className="label-spec text-[var(--color-copper)] tabular-nums w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="space-y-0.5">
                <p className="text-steel-100 font-display text-sm leading-tight">
                  {h.title}
                </p>
                <p className="text-xs text-steel-400 leading-relaxed">
                  {h.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
