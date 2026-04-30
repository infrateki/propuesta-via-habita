"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building,
  ClipboardCheck,
  Compass,
  GitBranch,
  Home,
  Telescope,
} from "lucide-react";
import { SectionShell } from "./SectionShell";
import { cn } from "@/lib/utils";

type Horizon = {
  id: string;
  icon: typeof Building;
  title: string;
  description: string;
};

const HORIZONS: Horizon[] = [
  {
    id: "scale",
    icon: Building,
    title: "Todos los proyectos, no sólo 6",
    description:
      "VIA-HABITA escala a la cartera completa: cada proyecto activo dentro de la misma plataforma, con la misma metodología y sin licencias por usuario.",
  },
  {
    id: "lifecycle",
    icon: GitBranch,
    title: "Ciclo de vida completo",
    description:
      "Diseño → construcción → venta → postventa, en una sola línea de trazabilidad. La información del proyecto sigue al departamento después de la entrega.",
  },
  {
    id: "postsale",
    icon: Home,
    title: "Postventa digital",
    description:
      "Digital twin del departamento entregado: el cliente y la administración consultan información estructurada en lugar de buscar en correos.",
  },
  {
    id: "official",
    icon: ClipboardCheck,
    title: "Entregas oficiales",
    description:
      "Recepción municipal (DOM), informes a bomberos, traspaso a la administración de la comunidad — todo coordinado desde el mismo modelo.",
  },
];

export function VisionSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="vision"
      num="09"
      eyebrow="Horizonte estratégico"
      title={
        <>
          Esta Fase 1 es el cimiento.
          <br />
          <span className="text-steel-300">Lo que se construye encima es de Habita.</span>
        </>
      }
      lede="Pablo lo dijo en directo: 'todos los planos de construcción, todos los planos de cliente, todo es lo mismo.' Esta visión no es compromiso de Fase 1 — es el marco que justifica construir la base bien."
    >
      <ul className="grid sm:grid-cols-2 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {HORIZONS.map((h, i) => {
          const Icon = h.icon;
          return (
            <motion.li
              key={h.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "bg-[var(--color-steel-800)] p-7 lg:p-9",
                "flex items-start gap-5 min-h-[180px]",
                "transition-colors duration-300",
                "hover:bg-[var(--color-steel-700)]",
              )}
            >
              <div className="shrink-0 hairline rounded-[var(--radius-spec)] p-3">
                <Icon
                  className="size-5 text-[var(--color-electric)]"
                  strokeWidth={1.5}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-steel-100 text-lg leading-tight">
                  {h.title}
                </h3>
                <p className="text-sm text-steel-300 leading-relaxed">
                  {h.description}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {/* Pablo quote callout */}
      <motion.figure
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 material-glass-strong chrome-edge p-7 lg:p-10 flex items-start gap-5"
      >
        <div className="shrink-0 hairline rounded-[var(--radius-spec)] p-3">
          <Telescope
            className="size-5 text-[var(--color-copper)]"
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-3">
          <blockquote className="font-display text-steel-100 text-xl lg:text-2xl leading-snug">
            &ldquo;Esa es la idea… todos los planos de construcción, todos los
            planos de cliente, todo es lo mismo.&rdquo;
          </blockquote>
          <figcaption className="label-spec text-steel-400">
            — Pablo Otero · 29 abril 2026
          </figcaption>
        </div>
      </motion.figure>

      {/* What this is NOT — manage expectations */}
      <motion.aside
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 hairline rounded-[var(--radius-card)] p-6 lg:p-7 bg-[var(--color-steel-800)]/60 flex items-start gap-4"
      >
        <Compass
          className="size-4 text-steel-400 shrink-0 mt-1"
          strokeWidth={1.5}
        />
        <div className="space-y-1.5">
          <p className="label-spec text-steel-400">Acotación</p>
          <p className="text-sm text-steel-300 leading-relaxed">
            Este horizonte es la dirección, no el alcance contratado. La Fase 1
            entrega los cimientos. Cada extensión (postventa, digital twins,
            integraciones DOM/bomberos) se evalúa al cierre de Fase 1 con base
            en lo aprendido.
          </p>
        </div>
      </motion.aside>
    </SectionShell>
  );
}
