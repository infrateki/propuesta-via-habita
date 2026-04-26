"use client";

import { useEffect, useState } from "react";
import { Calendar, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  "https://cal.com/sergio-infratek/30min";

type Props = {
  url?: string;
  triggerLabel?: string;
  triggerClassName?: string;
  variant?: "button" | "full-width";
};

export function ScheduleEmbed({
  url = DEFAULT_URL,
  triggerLabel = "Agendar kickoff",
  triggerClassName,
  variant = "button",
}: Props) {
  const [open, setOpen] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    setIframeLoaded(false);
    setIframeFailed(false);
    const fallbackTimer = setTimeout(() => {
      if (!iframeLoaded) setIframeFailed(true);
    }, 6000);
    return () => clearTimeout(fallbackTimer);
  }, [open, iframeLoaded]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const triggerBase =
    variant === "full-width"
      ? "w-full px-6 py-4 flex items-center justify-center gap-3"
      : "px-5 py-3 inline-flex items-center gap-2";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "material-glass-strong chrome-edge label-spec text-steel-100",
          "hover:text-[var(--color-copper)]",
          "transition-colors duration-[var(--duration-fast)]",
          triggerBase,
          triggerClassName
        )}
      >
        <Calendar className="size-4" strokeWidth={1.5} />
        <span>{triggerLabel}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="schedule-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-3xl h-[80vh] material-glass-strong chrome-edge flex flex-col">
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="label-spec text-[var(--color-copper)]">§AGENDA</span>
                <span className="hairline-l h-3" />
                <h2 id="schedule-title" className="label-spec text-steel-100">
                  Agendar una llamada con Sergio · 30 minutos
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="text-steel-300 hover:text-[var(--color-copper)] transition-colors"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </header>

            <div className="relative flex-1 bg-black/30">
              {!iframeFailed ? (
                <iframe
                  src={url}
                  title="Agendar con Sergio"
                  className="absolute inset-0 w-full h-full"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeFailed(true)}
                  allow="camera; microphone; fullscreen; payment"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <p className="text-steel-300 text-sm font-spec">
                    No pudimos cargar el embed. Abre el enlace directamente.
                  </p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="material-glass-strong chrome-edge px-5 py-3 label-spec text-steel-100 hover:text-[var(--color-copper)] inline-flex items-center gap-2"
                  >
                    <ExternalLink className="size-4" strokeWidth={1.5} />
                    <span>Abrir agenda</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
