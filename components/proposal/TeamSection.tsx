"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionShell } from "./SectionShell";
import { TEAM } from "@/data/proposal";
import { cn } from "@/lib/utils";

export function TeamSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="equipo"
      num="04"
      eyebrow="Equipo asignado"
      title={
        <>
          Personas con nombre,
          <br />
          <span className="text-steel-300">no roles abstractos.</span>
        </>
      }
      lede="El equipo conjunto Habita × INFRATEK que ejecuta la Fase 1. Más 3 personas de soporte técnico continuo de INFRATEK."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
        {TEAM.map((m, i) => (
          <motion.article
            key={m.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "bg-[var(--color-steel-800)] p-7 lg:p-8 space-y-5",
              "min-h-[280px] flex flex-col"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div
                aria-hidden
                className={cn(
                  "size-14 rounded-full grid place-items-center",
                  "material-steel chrome-edge",
                  "font-display text-steel-100 text-lg tracking-tight"
                )}
              >
                {m.initials}
              </div>
              <span
                className={cn(
                  "label-spec",
                  m.org === "INFRATEK"
                    ? "text-[var(--color-copper)]"
                    : "text-[var(--color-electric)]"
                )}
              >
                {m.org}
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <h3 className="text-steel-100 font-display text-lg leading-tight">
                {m.name}
              </h3>
              <p className="label-spec text-steel-300">{m.role}</p>
            </div>

            <p className="text-sm text-steel-400 leading-relaxed hairline-t pt-4">
              {m.dedication}
            </p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
