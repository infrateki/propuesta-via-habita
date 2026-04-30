"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Box,
  MessageSquare,
  BarChart3,
  Calendar,
  ClipboardList,
  FolderTree,
  Bot,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionShell } from "./SectionShell";
import { MODULES, PILLARS, type Module } from "@/data/proposal";
import { cn } from "@/lib/utils";

const ICONS: Record<Module["icon"], LucideIcon> = {
  FileText,
  Box,
  MessageSquare,
  BarChart3,
  Calendar,
  ClipboardList,
  FolderTree,
  Bot,
  Users,
};

export function SolutionSection() {
  const reduce = useReducedMotion();

  return (
    <SectionShell
      id="solucion"
      num="02"
      eyebrow="La solución"
      title={
        <>
          <span className="font-display tracking-tight">VIA</span>
          <span className="text-steel-400">·</span>
          <span className="font-display tracking-tight">HABITA</span>
        </>
      }
      lede="Plataforma CDE codesarrollada: usuarios ilimitados, propiedad total del código, sin vendor lock-in. Construida sobre la metodología VDC de Stanford."
    >
      {/* PILLARS (VDC Stanford) */}
      <div className="grid lg:grid-cols-3 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden mb-20">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.5,
              delay: reduce ? 0 : i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-[var(--color-steel-800)] p-8 lg:p-10 space-y-4"
          >
            <div className="flex items-baseline gap-4">
              <span
                className="text-display-lg font-display text-[var(--color-copper)] leading-none"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {pillar.letter}
              </span>
              <span className="label-spec text-steel-500">
                VDC · STANFORD 2025
              </span>
            </div>

            <h3 className="text-2xl text-steel-100 font-display">
              {pillar.name}
            </h3>

            <p className="text-sm text-steel-300 leading-relaxed">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FEATURE GRID (9 modules) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="label-spec text-steel-400">9 módulos</span>
          <span className="hairline-l h-3" />
          <span className="label-spec text-steel-500">
            Reemplaza PlanGrid · Notion · WhatsApp · email
          </span>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
          {MODULES.map((m, i) => {
            const Icon = ICONS[m.icon];
            return (
              <motion.li
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "bg-[var(--color-steel-800)] p-6",
                  "flex items-start gap-4",
                  "transition-colors duration-300",
                  "hover:bg-[var(--color-steel-700)]"
                )}
              >
                <div className="shrink-0 hairline rounded-[var(--radius-spec)] p-2.5 mt-0.5">
                  <Icon
                    className="size-4 text-[var(--color-electric)]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <h4 className="text-steel-100 font-display text-base leading-tight">
                    {m.name}
                  </h4>
                  <p className="text-sm text-steel-400 leading-relaxed">
                    {m.description}
                  </p>
                  {m.replaces !== "" ? (
                    <p className="label-spec text-steel-500 pt-1">
                      → reemplaza {m.replaces}
                    </p>
                  ) : (
                    <p className="label-spec text-[var(--color-copper)] pt-1">
                      → módulo nuevo
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
