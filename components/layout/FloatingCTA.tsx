"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const pathname = usePathname();
  // Configurator has its own sticky price summary + action buttons that
  // cover the bottom edge on mobile — the floating CTA would overlap.
  if (pathname === "/configurador") return null;

  return (
    <div
      aria-hidden={false}
      className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 items-end"
    >
      <Link
        href="https://wa.me/15514309185?text=Hola%20Sergio%2C%20estoy%20revisando%20la%20propuesta%20VIA-HABITA"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "material-glass-strong",
          "size-12 grid place-items-center rounded-full",
          "text-steel-200 hover:text-[var(--color-copper)]",
          "transition-colors duration-[var(--duration-fast)]"
        )}
        aria-label="WhatsApp Sergio"
      >
        <MessageCircle className="size-5" strokeWidth={1.5} />
      </Link>
      <Link
        href="/configurador"
        className={cn(
          "material-glass-strong chrome-edge",
          "px-5 py-3 label-spec text-steel-100",
          "hover:text-[var(--color-copper)]",
          "transition-colors duration-[var(--duration-fast)]",
          "flex items-center gap-2"
        )}
      >
        <Calendar className="size-4" strokeWidth={1.5} />
        <span>Configurar plan</span>
      </Link>
    </div>
  );
}
