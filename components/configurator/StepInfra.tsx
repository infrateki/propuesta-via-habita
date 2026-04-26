"use client";

import { Cloud, Server } from "lucide-react";
import type { Configuration, GpuOption, HostingOption } from "@/lib/pricing";
import { formatCurrency } from "@/lib/pricing";
import { GPU_OPTIONS, HOSTING_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  config: Configuration;
  update: <K extends keyof Configuration>(key: K, value: Configuration[K]) => void;
};

const QUALITY: Record<GpuOption, 1 | 2 | 3 | 4> = {
  none: 1,
  basica: 2,
  intermedia: 3,
  profesional: 4,
};

export function StepInfra({ config, update }: Props) {
  return (
    <section id="infra" className="space-y-6 scroll-mt-36">
      <header className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="label-spec text-[var(--color-electric)]">§04 · INFRAESTRUCTURA</span>
          <span className="hairline-l h-3" />
          <span className="label-spec">Hosting · GPU local opcional</span>
        </div>
        <h2 className="text-display-md text-steel-100 font-display">
          Infraestructura
        </h2>
        <p className="text-sm text-steel-400 max-w-xl">
          Empieza en cloud INFRATEK sin costo extra. Migra a servidores propios
          cuando lo decidas — sin vendor lock-in, sin reescribir nada.
        </p>
      </header>

      <div className="space-y-3">
        <p className="label-spec text-steel-300">Hosting</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {HOSTING_OPTIONS.map((h) => {
            const selected = config.hosting === h.id;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => update("hosting", h.id as HostingOption)}
                aria-pressed={selected}
                className={cn(
                  "text-left p-5 rounded-[var(--radius-card)] border transition-all duration-[var(--duration-fast)]",
                  selected
                    ? "border-[var(--color-electric)] bg-[var(--color-electric)]/[0.05]"
                    : "border-[var(--color-hairline-strong)] hover:border-steel-400"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-[var(--color-copper)]">
                    {h.id === "cloud" ? <Cloud size={18} /> : <Server size={18} />}
                    <p className="text-base text-steel-100 font-display">{h.label}</p>
                  </div>
                  <RadioMark selected={selected} />
                </div>
                <p className="text-sm text-steel-300 leading-relaxed mb-4">
                  {h.description}
                </p>
                <div className="hairline-t pt-3 flex items-baseline justify-between">
                  <span className="label-spec text-steel-500">{h.ownership}</span>
                  <span className="text-spec-price text-steel-100 tabular-nums">
                    {h.price === 0 ? "Incluido" : formatCurrency(h.price)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <p className="label-spec text-steel-300">GPU local · opcional</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {GPU_OPTIONS.map((g) => {
            const selected = config.gpu === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => update("gpu", g.id as GpuOption)}
                aria-pressed={selected}
                className={cn(
                  "text-left p-5 rounded-[var(--radius-card)] border transition-all duration-[var(--duration-fast)]",
                  selected
                    ? "border-[var(--color-electric)] bg-[var(--color-electric)]/[0.05]"
                    : "border-[var(--color-hairline-strong)] hover:border-steel-400"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <p className="label-spec text-steel-400 truncate">
                      {g.vram ? `${g.vram} VRAM` : "Sin hardware local"}
                    </p>
                    <p className="text-base text-steel-100 font-display mt-1">
                      {g.label}
                    </p>
                  </div>
                  <RadioMark selected={selected} />
                </div>
                <p className="text-sm text-steel-300 leading-relaxed mb-2">
                  {g.description}
                </p>
                {g.useCase && (
                  <p className="label-spec text-steel-500 mb-4">{g.useCase}</p>
                )}
                <div className="hairline-t pt-3 flex items-end justify-between gap-3">
                  <QualityBars level={QUALITY[g.id]} />
                  <span className="text-spec-price text-steel-100 tabular-nums">
                    {g.price === 0 ? "—" : formatCurrency(g.price)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function RadioMark({ selected }: { selected: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "w-4 h-4 rounded-full border-2 mt-1 shrink-0 transition-colors duration-[var(--duration-fast)]",
        selected
          ? "border-[var(--color-electric)] bg-[var(--color-electric)]"
          : "border-steel-400"
      )}
    />
  );
}

function QualityBars({ level }: { level: 1 | 2 | 3 | 4 }) {
  return (
    <div className="flex items-end gap-0.5" aria-label={`Nivel ${level} de 4`}>
      {[1, 2, 3, 4].map((b) => (
        <span
          key={b}
          className={cn(
            "w-1 transition-colors duration-[var(--duration-fast)]",
            b <= level
              ? "bg-[var(--color-copper)]"
              : "bg-[var(--color-steel-600)]"
          )}
          style={{ height: `${b * 3 + 4}px` }}
        />
      ))}
    </div>
  );
}
