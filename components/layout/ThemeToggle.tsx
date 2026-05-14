"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Top-right corner toggle. Mounted via Navigation so it lives in the same nav
 * bar as the download CTA. Renders a stable placeholder on first paint to
 * avoid the next-themes hydration mismatch.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : undefined;
  const isLight = current === "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={isLight ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      title={isLight ? "Modo oscuro" : "Modo claro"}
      className={cn(
        "label-spec inline-flex items-center justify-center",
        "size-9 min-h-9 rounded-[var(--radius-spec)]",
        "text-steel-200 hover:text-[var(--color-copper)]",
        "transition-colors duration-[var(--duration-fast)]",
        className,
      )}
    >
      {/* placeholder during SSR/before-mount to keep layout stable */}
      <span aria-hidden className={mounted ? "hidden" : "inline-block size-4"} />
      {mounted ? (
        isLight ? <Moon size={16} strokeWidth={1.75} /> : <Sun size={16} strokeWidth={1.75} />
      ) : null}
    </button>
  );
}
