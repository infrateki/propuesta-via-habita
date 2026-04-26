"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Step = { id: string; num: number; label: string };

export function StepIndicator({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState<string>(steps[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    steps.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const o = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id);
          });
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps]);

  return (
    <div className="sticky top-14 z-20 -mx-6 lg:-mx-10 px-6 lg:px-10 py-3 material-glass border-b border-[var(--color-hairline)]">
      <ol className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
        {steps.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={`#${s.id}`}
                className="flex items-center gap-2.5 sm:gap-3 group min-h-11 py-1.5"
              >
                <span
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-spec border",
                    "transition-all duration-[var(--duration-fast)]",
                    isActive
                      ? "border-[var(--color-electric)] text-[var(--color-electric)] bg-[var(--color-electric)]/[0.06]"
                      : "border-[var(--color-hairline-strong)] text-steel-400 group-hover:border-steel-400"
                  )}
                >
                  {s.num}
                </span>
                <span
                  className={cn(
                    "label-spec hidden sm:inline transition-colors duration-[var(--duration-fast)]",
                    isActive
                      ? "text-steel-100"
                      : "text-steel-400 group-hover:text-steel-200"
                  )}
                >
                  {s.label}
                </span>
              </a>
              {i < steps.length - 1 && (
                <span className="hairline-t w-4 sm:w-10 shrink-0" />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
