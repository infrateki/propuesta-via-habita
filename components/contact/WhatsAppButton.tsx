"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15514309185";
const DEFAULT_MESSAGE =
  "Hola Sergio, estoy revisando la propuesta VIA-HABITA para Grupo Inmobiliario Habita.";

type Variant = "floating" | "inline" | "full-width";

type Props = {
  variant?: Variant;
  message?: string;
  number?: string;
  label?: string;
  className?: string;
};

export function WhatsAppButton({
  variant = "inline",
  message = DEFAULT_MESSAGE,
  number = DEFAULT_NUMBER,
  label = "WhatsApp",
  className,
}: Props) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Sergio"
        className={cn(
          "material-glass-strong size-12 grid place-items-center rounded-full",
          "text-steel-200 hover:text-[var(--color-copper)]",
          "transition-colors duration-[var(--duration-fast)]",
          className
        )}
      >
        <MessageCircle className="size-5" strokeWidth={1.5} />
      </a>
    );
  }

  if (variant === "full-width") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "material-glass-strong chrome-edge",
          "w-full px-6 py-4 label-spec text-steel-100",
          "hover:text-[var(--color-copper)]",
          "transition-colors duration-[var(--duration-fast)]",
          "flex items-center justify-center gap-3",
          className
        )}
      >
        <MessageCircle className="size-4" strokeWidth={1.5} />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "material-glass-strong",
        "px-4 py-2 label-spec text-steel-200",
        "hover:text-[var(--color-copper)]",
        "transition-colors duration-[var(--duration-fast)]",
        "inline-flex items-center gap-2",
        className
      )}
    >
      <MessageCircle className="size-4" strokeWidth={1.5} />
      <span>{label}</span>
    </a>
  );
}
