"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

/**
 * Wraps next-themes with the project's defaults:
 * - dark default (matches current production look)
 * - attribute="data-theme" so CSS overrides via [data-theme="light"]
 * - no system-preference resolution (explicit user choice via toggle); flip
 *   to `enableSystem` if we ever want OS-pref to win on first paint
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
