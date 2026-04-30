"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/propuesta", label: "Propuesta" },
  { href: "/configurador", label: "Configurador" },
  { href: "/comparativo", label: "Comparativo" },
  { href: "/documento", label: "Documento" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="material-glass border-b border-[var(--color-hairline)]">
        <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group min-h-11"
            aria-label="VIA-HABITA · inicio"
            onClick={() => setOpen(false)}
          >
            <span className="label-spec text-steel-200">VIA·HABITA</span>
            <span className="hairline-l h-4" />
            <span className="label-spec text-steel-400 hidden sm:inline">
              INFRATEK × HABITA
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm hover:text-steel-100",
                    "transition-colors duration-[var(--duration-fast)]",
                    "label-spec",
                    pathname === item.href ? "text-steel-100" : "text-steel-200"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="/proposal.pdf"
              download="INFRATEK_Propuesta_VIA-HABITA_2026_v11.pdf"
              className={cn(
                "label-spec px-3 py-2 text-steel-200 min-h-11 inline-flex items-center gap-2",
                "hover:text-[var(--color-copper)]",
                "transition-colors duration-[var(--duration-fast)]"
              )}
              aria-label="Descargar propuesta PDF"
              title="Descargar propuesta PDF"
            >
              <FileDown size={16} strokeWidth={1.5} />
              <span className="hidden sm:inline">PDF</span>
            </a>
            <Link
              href="/configurador"
              className={cn(
                "label-spec px-4 py-2 text-steel-100 min-h-11 hidden md:inline-flex items-center",
                "border border-[var(--color-hairline-strong)]",
                "hover:border-[var(--color-copper)] hover:text-[var(--color-copper)]",
                "transition-colors duration-[var(--duration-fast)]",
                "rounded-[var(--radius-spec)]"
              )}
            >
              Configurar →
            </Link>

            {/* Hamburger (mobile only) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-11 h-11 flex items-center justify-center text-steel-200 hover:text-steel-100 transition-colors"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
            >
              {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {open && (
          <div
            id="mobile-nav-drawer"
            className="md:hidden hairline-t bg-[var(--color-steel-800)]/95"
          >
            <ul className="mx-auto max-w-7xl px-6 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="hairline-b last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "label-spec flex items-center min-h-12 transition-colors duration-[var(--duration-fast)]",
                      pathname === item.href
                        ? "text-[var(--color-copper)]"
                        : "text-steel-200 hover:text-steel-100"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/configurador"
                  onClick={() => setOpen(false)}
                  className="label-spec flex items-center justify-between min-h-12 px-4 my-2 text-steel-100 border border-[var(--color-hairline-strong)] hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] transition-colors rounded-[var(--radius-spec)]"
                >
                  <span>Configurar →</span>
                </Link>
              </li>
              <li>
                <a
                  href="/proposal.pdf"
                  download="INFRATEK_Propuesta_VIA-HABITA_2026_v11.pdf"
                  onClick={() => setOpen(false)}
                  className="label-spec flex items-center justify-between min-h-12 px-4 my-2 text-steel-100 border border-[var(--color-hairline-strong)] hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] transition-colors rounded-[var(--radius-spec)]"
                >
                  <span>Descargar propuesta PDF</span>
                  <FileDown size={16} strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
