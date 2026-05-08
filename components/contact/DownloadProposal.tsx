"use client";

import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  filename?: string;
  label?: string;
  variant?: "button" | "full-width";
  className?: string;
};

export function DownloadProposal({
  href = "/proposal.pdf",
  filename = "INFRATEK_Propuesta_VIA-HABITA_2026_v12.pdf",
  label = "Descargar propuesta completa",
  variant = "button",
  className,
}: Props) {
  const base =
    variant === "full-width"
      ? "w-full px-6 py-4 flex items-center justify-center gap-3"
      : "px-5 py-3 inline-flex items-center gap-2";

  return (
    <a
      href={href}
      download={filename}
      className={cn(
        "material-glass-strong chrome-edge label-spec text-steel-100",
        "hover:text-[var(--color-copper)]",
        "transition-colors duration-[var(--duration-fast)]",
        base,
        className
      )}
    >
      <FileText className="size-4" strokeWidth={1.5} />
      <span>{label}</span>
    </a>
  );
}
