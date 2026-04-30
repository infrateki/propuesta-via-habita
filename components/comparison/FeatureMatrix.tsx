"use client";

import { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Check,
  X,
  Clock,
  CircleDot,
  ChevronDown,
  Star,
  Sparkles,
  Minimize2,
  Maximize2,
} from "lucide-react";
import {
  PLATFORMS,
  CATEGORIES,
  FEATURES,
  countBySupport,
  getByCategory,
  getWeightedScore,
  type Feature,
  type FeatureSupport,
  type Platform,
  type CategoryInfo,
} from "@/data/features";
import { cn } from "@/lib/utils";

const TOTAL_FEATURES = FEATURES.length;

// Default expanded = top 3 categories by weight (pricing_model 95, doc-mgmt-basic 90, communication 90)
const DEFAULT_EXPANDED: ReadonlySet<string> = new Set(
  [...CATEGORIES]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((c) => c.id)
);

const SUPPORT_LABEL: Record<FeatureSupport, string> = {
  full: "Sí",
  partial: "Parcial",
  none: "No",
  roadmap: "Roadmap",
};

/**
 * Interactive feature comparison matrix for /comparativo "Funcionalidades" tab.
 *
 * Layout:
 *   1. Summary row: one card per platform (counts + weighted score bar)
 *   2. Toolbar: global counts + Expand/Collapse all
 *   3. Single sticky-header table with collapsible category sections
 *
 * Mobile: the wrapper enables horizontal scroll; the platform header row
 * stays sticky at the top while you scroll, and the feature-name column
 * stays sticky on the left while you scroll horizontally.
 */
export function FeatureMatrix() {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(DEFAULT_EXPANDED)
  );

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () =>
    setExpanded(new Set(CATEGORIES.map((c) => c.id)));
  const collapseAll = () => setExpanded(new Set());

  const allOpen = expanded.size === CATEGORIES.length;

  return (
    <div className="space-y-12">
      <SummaryGrid />

      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <p className="label-spec text-[var(--color-copper)]">
            Matriz de funcionalidades
          </p>
          <p className="text-sm text-steel-300">
            {TOTAL_FEATURES} funcionalidades · {CATEGORIES.length} categorías ·{" "}
            {PLATFORMS.length} plataformas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ToolbarButton
            onClick={expandAll}
            disabled={allOpen}
            icon={<Maximize2 className="size-3.5" strokeWidth={1.5} />}
          >
            Expandir todo
          </ToolbarButton>
          <ToolbarButton
            onClick={collapseAll}
            disabled={expanded.size === 0}
            icon={<Minimize2 className="size-3.5" strokeWidth={1.5} />}
          >
            Colapsar todo
          </ToolbarButton>
        </div>
      </div>

      <MatrixTable expanded={expanded} onToggle={toggle} />

      <Legend />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Summary grid: per-platform counts + weighted score                          */
/* -------------------------------------------------------------------------- */

function SummaryGrid() {
  const reduce = useReducedMotion();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--color-hairline)] hairline rounded-[var(--radius-card)] overflow-hidden">
      {PLATFORMS.map((p, i) => {
        const counts = countBySupport(p.id);
        const score = getWeightedScore(p.id);
        return (
          <motion.article
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.55,
              delay: reduce ? 0 : i * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              "relative bg-[var(--color-steel-800)] p-6 lg:p-7 space-y-5",
              p.highlight && "bg-[var(--color-electric)]/[0.05]"
            )}
          >
            {p.highlight ? (
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-electric)]"
              />
            ) : null}

            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 min-w-0">
                <h3
                  className={cn(
                    "font-display text-base leading-tight truncate",
                    p.highlight ? "text-steel-100" : "text-steel-200"
                  )}
                >
                  {p.name}
                </h3>
                <p className="label-spec text-steel-500 text-[10px] normal-case tracking-normal truncate">
                  {p.pricingNote}
                </p>
              </div>
              {p.highlight ? (
                <Sparkles
                  className="size-4 text-[var(--color-electric)] shrink-0"
                  strokeWidth={1.5}
                />
              ) : null}
            </div>

            {/* Weighted score */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="label-spec text-steel-500">Puntaje ponderado</span>
                <span
                  className={cn(
                    "font-display text-2xl text-spec-price tabular-nums leading-none",
                    p.highlight
                      ? "text-[var(--color-electric)]"
                      : "text-steel-200"
                  )}
                >
                  {score}
                  <span className="text-steel-500 text-sm"> / 100</span>
                </span>
              </div>
              <div className="h-1.5 bg-[var(--color-steel-700)] rounded-full overflow-hidden">
                <motion.div
                  initial={reduce ? { width: `${score}%` } : { width: 0 }}
                  whileInView={
                    reduce ? undefined : { width: `${score}%` }
                  }
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 1.0,
                    delay: reduce ? 0 : 0.25 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    "h-full rounded-full",
                    p.highlight
                      ? "bg-gradient-to-r from-[var(--color-electric)]/70 to-[var(--color-electric)]"
                      : "bg-gradient-to-r from-[var(--color-steel-500)] to-[var(--color-steel-300)]"
                  )}
                />
              </div>
            </div>

            {/* Counts */}
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 hairline-t pt-4">
              <CountRow level="full" count={counts.full} />
              <CountRow level="partial" count={counts.partial} />
              <CountRow level="roadmap" count={counts.roadmap} />
              <CountRow level="none" count={counts.none} />
            </ul>
          </motion.article>
        );
      })}
    </div>
  );
}

function CountRow({
  level,
  count,
}: {
  level: FeatureSupport;
  count: number;
}) {
  return (
    <li className="flex items-center gap-2">
      <SupportIcon level={level} size="sm" />
      <span className="font-spec text-spec-price tabular-nums text-sm text-steel-200">
        {count}
        <span className="text-steel-500">/{TOTAL_FEATURES}</span>
      </span>
      <span className="label-spec text-steel-500 text-[10px] truncate">
        {SUPPORT_LABEL[level]}
      </span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Matrix table                                                                */
/* -------------------------------------------------------------------------- */

const NAME_COL = "w-[44%] sm:w-[42%] lg:w-[36%]";
const PLATFORM_COL = "w-[56%] sm:w-[58%] lg:w-[64%]";

function MatrixTable({
  expanded,
  onToggle,
}: {
  expanded: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="hairline rounded-[var(--radius-card)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <colgroup>
            <col className={NAME_COL} />
            {PLATFORMS.map((p) => (
              <col key={p.id} className="w-[88px] lg:w-auto" />
            ))}
          </colgroup>

          <thead>
            <tr>
              <th
                scope="col"
                className={cn(
                  "sticky top-14 left-0 z-30",
                  "px-5 py-4 text-left align-bottom",
                  "bg-[var(--color-steel-700)] hairline-strong-b"
                )}
              >
                <span className="label-spec text-steel-300">Funcionalidad</span>
              </th>
              {PLATFORMS.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn(
                    "sticky top-14 z-20 px-3 py-4 align-bottom text-center",
                    "bg-[var(--color-steel-700)] hairline-strong-b",
                    p.highlight && "relative"
                  )}
                >
                  {p.highlight ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--color-electric)]"
                    />
                  ) : null}
                  <div
                    className={cn(
                      "flex flex-col items-center gap-1",
                      p.highlight && "text-steel-100"
                    )}
                  >
                    <span
                      className={cn(
                        "label-spec",
                        p.highlight
                          ? "text-[var(--color-electric)]"
                          : "text-steel-300"
                      )}
                    >
                      {p.shortName}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-spec leading-tight",
                        p.highlight ? "text-steel-100" : "text-steel-400"
                      )}
                    >
                      {p.name}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {CATEGORIES.map((cat) => (
              <CategorySection
                key={cat.id}
                category={cat}
                isOpen={expanded.has(cat.id)}
                onToggle={() => onToggle(cat.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const ROW_VARIANTS: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
};

function CategorySection({
  category,
  isOpen,
  onToggle,
}: {
  category: CategoryInfo;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  const features = useMemo(() => getByCategory(category.id), [category.id]);

  // Per-category support spread (for the header chip)
  const headerCounts = useMemo(() => {
    const counts: Record<FeatureSupport, number> = {
      full: 0,
      partial: 0,
      none: 0,
      roadmap: 0,
    };
    for (const f of features) {
      const level = f.support["viahabita"] ?? "none";
      counts[level]++;
    }
    return counts;
  }, [features]);

  return (
    <>
      {/* Category header row (clickable, spans all columns) */}
      <tr className="hairline-strong-t">
        <th
          colSpan={1 + PLATFORMS.length}
          scope="rowgroup"
          className={cn(
            "p-0 text-left",
            "bg-[var(--color-steel-700)]/40",
            "hover:bg-[var(--color-steel-700)]/70 transition-colors"
          )}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={`cat-${category.id}-rows`}
            className={cn(
              "w-full px-5 py-4 lg:py-5 flex items-center gap-4",
              "focus:outline-none focus-visible:bg-[var(--color-steel-700)]"
            )}
          >
            <motion.span
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 text-steel-400"
            >
              <ChevronDown className="size-4" strokeWidth={1.5} />
            </motion.span>

            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
              <h3 className="font-display text-steel-100 text-base lg:text-lg leading-tight">
                {category.label}
              </h3>
              <span className="label-spec text-steel-500 text-[10px] normal-case tracking-normal">
                {category.description}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <CategoryHeaderChip counts={headerCounts} total={features.length} />
              <span className="label-spec text-steel-500 tabular-nums">
                W·{category.weight}
              </span>
            </div>

            <div className="md:hidden shrink-0">
              <span className="label-spec text-steel-500 tabular-nums">
                {features.length}
              </span>
            </div>
          </button>
        </th>
      </tr>

      <AnimatePresence initial={false}>
        {isOpen
          ? features.map((feature, i) => (
              <motion.tr
                key={feature.id}
                id={i === 0 ? `cat-${category.id}-rows` : undefined}
                layout="position"
                initial={reduce ? false : "hidden"}
                animate="visible"
                exit={reduce ? undefined : "exit"}
                variants={ROW_VARIANTS}
                transition={{
                  duration: 0.25,
                  delay: reduce ? 0 : Math.min(i * 0.015, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="hairline-b last:border-b-0 hover:bg-[var(--color-steel-700)]/30 transition-colors"
              >
                <td
                  className={cn(
                    "sticky left-0 z-10 align-top px-5 py-3.5",
                    "bg-[var(--color-steel-800)]"
                  )}
                >
                  <FeatureNameCell feature={feature} />
                </td>
                {PLATFORMS.map((p) => (
                  <td
                    key={p.id}
                    className={cn(
                      "px-3 py-3.5 align-middle text-center relative",
                      p.highlight && "bg-[var(--color-electric)]/[0.04]"
                    )}
                  >
                    {p.highlight ? (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[2px] bg-[var(--color-electric)]/40"
                      />
                    ) : null}
                    <SupportIcon
                      level={feature.support[p.id] ?? "none"}
                      title={`${p.name}: ${
                        SUPPORT_LABEL[feature.support[p.id] ?? "none"]
                      }`}
                    />
                  </td>
                ))}
              </motion.tr>
            ))
          : null}
      </AnimatePresence>
    </>
  );
}

function FeatureNameCell({ feature }: { feature: Feature }) {
  return (
    <div className="space-y-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-steel-100 font-display text-sm leading-tight">
          {feature.name}
        </span>
        {feature.differentiator ? (
          <span
            title="Diferenciador VIA-HABITA"
            className={cn(
              "inline-flex items-center gap-1 px-1.5 py-0.5",
              "rounded-[var(--radius-spec)] hairline",
              "bg-[var(--color-copper)]/10 text-[var(--color-copper)]"
            )}
          >
            <Star className="size-2.5" fill="currentColor" strokeWidth={1.5} />
            <span className="text-[9px] font-mono uppercase tracking-wider">
              Único
            </span>
          </span>
        ) : null}
      </div>
      <p className="text-xs text-steel-400 leading-snug font-spec">
        {feature.description}
      </p>
    </div>
  );
}

function CategoryHeaderChip({
  counts,
  total,
}: {
  counts: Record<FeatureSupport, number>;
  total: number;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 hairline rounded-[var(--radius-spec)] px-2.5 py-1 bg-[var(--color-steel-800)]">
      <span className="label-spec text-[var(--color-electric)]">VIA</span>
      <span className="font-spec text-[11px] text-steel-200 tabular-nums">
        {counts.full}
        <span className="text-steel-500">/{total}</span>
      </span>
      {counts.roadmap > 0 ? (
        <span className="font-spec text-[10px] text-[var(--color-electric)] tabular-nums">
          +{counts.roadmap} 🔜
        </span>
      ) : null}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Support icon                                                                */
/* -------------------------------------------------------------------------- */

function SupportIcon({
  level,
  size = "md",
  title,
}: {
  level: FeatureSupport;
  size?: "sm" | "md";
  title?: string;
}) {
  const dim = size === "sm" ? "size-4" : "size-5";
  const wrap = size === "sm" ? "size-5" : "size-7";

  const config = {
    full: {
      icon: <Check className={cn(dim)} strokeWidth={2.5} />,
      bg: "bg-[var(--color-emerald)]/15 text-[var(--color-emerald)]",
      label: SUPPORT_LABEL.full,
    },
    partial: {
      icon: <CircleDot className={cn(dim)} strokeWidth={2} />,
      bg: "bg-[var(--color-copper)]/15 text-[var(--color-copper)]",
      label: SUPPORT_LABEL.partial,
    },
    none: {
      icon: <X className={cn(dim)} strokeWidth={2} />,
      bg: "bg-[var(--color-steel-700)] text-steel-500",
      label: SUPPORT_LABEL.none,
    },
    roadmap: {
      icon: <Clock className={cn(dim)} strokeWidth={2} />,
      bg: "bg-[var(--color-electric)]/15 text-[var(--color-electric)]",
      label: SUPPORT_LABEL.roadmap,
    },
  } as const;

  const c = config[level];

  return (
    <span
      role="img"
      aria-label={title ?? c.label}
      title={title ?? c.label}
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        wrap,
        c.bg
      )}
    >
      {c.icon}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Legend                                                                      */
/* -------------------------------------------------------------------------- */

function Legend() {
  return (
    <div className="hairline rounded-[var(--radius-card)] p-5 lg:p-6 bg-[var(--color-steel-800)]">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="label-spec text-steel-400">Leyenda</span>
        <span className="hairline-l h-3" />
        <LegendItem level="full" label="Totalmente soportado" />
        <LegendItem level="partial" label="Parcial / con limitaciones" />
        <LegendItem level="roadmap" label="En desarrollo / roadmap" />
        <LegendItem level="none" label="No disponible" />
        <span className="hairline-l h-3 hidden lg:inline" />
        <span className="inline-flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-1.5 py-0.5",
              "rounded-[var(--radius-spec)] hairline",
              "bg-[var(--color-copper)]/10 text-[var(--color-copper)]"
            )}
          >
            <Star className="size-2.5" fill="currentColor" strokeWidth={1.5} />
            <span className="text-[9px] font-mono uppercase tracking-wider">
              Único
            </span>
          </span>
          <span className="label-spec text-steel-400">
            Diferenciador VIA-HABITA
          </span>
        </span>
      </div>
    </div>
  );
}

function LegendItem({
  level,
  label,
}: {
  level: FeatureSupport;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <SupportIcon level={level} size="sm" />
      <span className="label-spec text-steel-400">{label}</span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Toolbar button                                                              */
/* -------------------------------------------------------------------------- */

function ToolbarButton({
  children,
  onClick,
  disabled,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "label-spec px-3 py-2 hairline rounded-[var(--radius-spec)]",
        "inline-flex items-center gap-2",
        "transition-colors duration-[var(--duration-fast)]",
        disabled
          ? "text-steel-600 cursor-not-allowed"
          : "text-steel-300 hover:text-steel-100 hover:border-[var(--color-hairline-strong)]"
      )}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

// Suppress "Platform unused" if a future refactor drops the type; the type
// is exported by data/features so consumers can adopt the same interface.
export type { Platform };
