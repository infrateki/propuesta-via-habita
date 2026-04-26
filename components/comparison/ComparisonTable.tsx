"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  Info,
  Star,
} from "lucide-react";
import { PLATFORMS, type Platform } from "@/data/platforms";
import { formatUSD, cn } from "@/lib/utils";

type SortKey = "name" | "model" | "cost" | "unlimited" | "externals";
type SortDir = "asc" | "desc";
type Scale = "u5" | "u50";

const MODEL_LABELS: Record<Platform["pricingModel"], string> = {
  "per-user": "Por usuario",
  "per-project": "Por proyecto",
  volume: "Por volumen",
  hybrid: "Híbrido",
  custom: "Negociado",
};

export function ComparisonTable() {
  const [scale, setScale] = useState<Scale>("u50");
  const [sortKey, setSortKey] = useState<SortKey>("cost");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const costFor = (p: Platform) => (scale === "u5" ? p.cost5Users : p.cost50Users);

  const sorted = useMemo(() => {
    const arr = [...PLATFORMS];
    arr.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name) * dir;
        case "model":
          return MODEL_LABELS[a.pricingModel].localeCompare(
            MODEL_LABELS[b.pricingModel]
          ) * dir;
        case "cost": {
          const ca = costFor(a) ?? Number.POSITIVE_INFINITY;
          const cb = costFor(b) ?? Number.POSITIVE_INFINITY;
          return (ca - cb) * dir;
        }
        case "unlimited":
          return (Number(a.unlimitedUsers) - Number(b.unlimitedUsers)) * -dir;
        case "externals":
          return (Number(a.externalsFree) - Number(b.externalsFree)) * -dir;
      }
    });
    return arr;
  }, [sortKey, sortDir, scale]);

  const setSort = (k: SortKey) => {
    if (k === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(k);
      setSortDir(k === "cost" || k === "name" ? "asc" : "desc");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="label-spec text-steel-300">
            12 plataformas · 6 proyectos activos · Chile
          </p>
          <p className="text-xs text-steel-500 font-spec">
            Hover sobre cualquier precio para ver fuente y supuestos.
          </p>
        </div>

        <ScaleToggle scale={scale} onChange={setScale} />
      </div>

      {/* TABLE — horizontal scroll on mobile, sticky first column */}
      <div className="hairline rounded-[var(--radius-card)] overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-[var(--color-steel-700)]/40 hairline-b">
              <Th
                onClick={() => setSort("name")}
                active={sortKey === "name"}
                dir={sortDir}
                className="text-left w-[42%] md:w-[28%] sticky left-0 z-10 bg-[var(--color-steel-700)] md:bg-transparent border-r border-[var(--color-hairline)] md:border-r-0"
              >
                Plataforma
              </Th>
              <Th
                onClick={() => setSort("model")}
                active={sortKey === "model"}
                dir={sortDir}
                className="text-left w-[18%]"
              >
                Modelo
              </Th>
              <Th
                onClick={() => setSort("cost")}
                active={sortKey === "cost"}
                dir={sortDir}
                className="text-right w-[24%]"
              >
                Costo anual ({scale === "u5" ? "5 usuarios" : "50 usuarios"})
              </Th>
              <Th
                onClick={() => setSort("unlimited")}
                active={sortKey === "unlimited"}
                dir={sortDir}
                className="text-center w-[15%]"
              >
                Usuarios ilimitados
              </Th>
              <Th
                onClick={() => setSort("externals")}
                active={sortKey === "externals"}
                dir={sortDir}
                className="text-center w-[15%]"
              >
                Externos sin costo
              </Th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {sorted.map((p) => (
                <motion.tr
                  key={p.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "hairline-b last:border-b-0 transition-colors",
                    p.highlight
                      ? "bg-[var(--color-electric)]/[0.05]"
                      : "hover:bg-[var(--color-steel-700)]/30"
                  )}
                >
                  <td
                    className={cn(
                      "px-5 py-4 align-middle relative sticky left-0 z-[1] border-r border-[var(--color-hairline)] md:border-r-0",
                      p.highlight
                        ? "bg-[var(--color-steel-800)]"
                        : "bg-[var(--color-steel-800)]"
                    )}
                  >
                    {p.highlight ? (
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-electric)]"
                      />
                    ) : null}
                    <div className="flex items-center gap-2">
                      {p.highlight ? (
                        <Star
                          className="size-3.5 text-[var(--color-electric)]"
                          fill="currentColor"
                          strokeWidth={1.5}
                        />
                      ) : null}
                      <span
                        className={cn(
                          "font-display text-base",
                          p.highlight ? "text-steel-100" : "text-steel-200"
                        )}
                      >
                        {p.name}
                      </span>
                    </div>
                    {p.vendor ? (
                      <p className="label-spec text-steel-500 mt-1 normal-case tracking-normal text-[10px]">
                        {p.vendor}
                      </p>
                    ) : null}
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <span className="label-spec text-steel-300">
                      {MODEL_LABELS[p.pricingModel]}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-middle text-right">
                    <CostCell platform={p} scale={scale} />
                  </td>

                  <td className="px-5 py-4 align-middle text-center">
                    <BoolCell value={p.unlimitedUsers} positive />
                  </td>

                  <td className="px-5 py-4 align-middle text-center">
                    <BoolCell value={p.externalsFree} positive />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        </div>
        <p className="md:hidden label-spec text-steel-500 text-center py-2 hairline-t">
          ← desliza para ver más columnas →
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Subcomponents                                                       */
/* ------------------------------------------------------------------ */

function ScaleToggle({
  scale,
  onChange,
}: {
  scale: Scale;
  onChange: (s: Scale) => void;
}) {
  return (
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
            onClick={() => onChange(s)}
            className={cn(
              "label-spec px-4 py-2.5 min-h-11 rounded-[var(--radius-spec)] transition-colors",
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
  );
}

function Th({
  children,
  onClick,
  active,
  dir,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  dir: SortDir;
  className?: string;
}) {
  const Icon = !active ? ArrowUpDown : dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      scope="col"
      className={cn("px-5 py-3.5 align-middle font-normal", className)}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "label-spec inline-flex items-center gap-1.5 transition-colors",
          active
            ? "text-[var(--color-copper)]"
            : "text-steel-400 hover:text-steel-200"
        )}
      >
        <span>{children}</span>
        <Icon className="size-3" strokeWidth={2} />
      </button>
    </th>
  );
}

function CostCell({ platform, scale }: { platform: Platform; scale: Scale }) {
  const cost = scale === "u5" ? platform.cost5Users : platform.cost50Users;

  return (
    <div className="inline-flex items-center gap-2 group relative">
      <span
        className={cn(
          "font-spec text-spec-price tabular-nums text-base",
          platform.highlight
            ? "text-steel-100"
            : platform.cost50Users > 50_000
            ? "text-[var(--color-warning)]"
            : "text-steel-200"
        )}
      >
        {cost == null ? "—" : formatUSD(cost, { compact: true })}
      </span>
      <span
        tabIndex={0}
        aria-label="Fuente y supuestos"
        className="text-steel-500 hover:text-steel-200 focus:text-steel-200 transition-colors cursor-help"
      >
        <Info className="size-3.5" strokeWidth={1.5} />
        <SourceTooltip platform={platform} />
      </span>
    </div>
  );
}

function SourceTooltip({ platform }: { platform: Platform }) {
  return (
    <span
      role="tooltip"
      className={cn(
        "absolute right-0 top-full mt-2 z-20",
        "w-72 max-w-[80vw] text-left",
        "material-glass-strong chrome-edge p-4 space-y-2",
        "opacity-0 pointer-events-none translate-y-1",
        "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
        "group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
        "transition-[opacity,transform] duration-[var(--duration-fast)]"
      )}
    >
      <span className="label-spec text-[var(--color-copper)] block">
        {platform.name}
      </span>
      <span className="block text-xs text-steel-300 leading-relaxed font-sans normal-case">
        {platform.notes}
      </span>
      {platform.sourceUrl ? (
        <span className="block label-spec text-steel-500 truncate">
          {platform.sourceUrl}
        </span>
      ) : null}
    </span>
  );
}

function BoolCell({ value, positive }: { value: boolean; positive?: boolean }) {
  if (value) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center size-6 rounded-full",
          positive
            ? "bg-[var(--color-emerald)]/15 text-[var(--color-emerald)]"
            : "bg-[var(--color-warning)]/15 text-[var(--color-warning)]"
        )}
      >
        <Check className="size-3.5" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center size-6 rounded-full bg-[var(--color-steel-700)] text-steel-500">
      <X className="size-3.5" strokeWidth={2} />
    </span>
  );
}
