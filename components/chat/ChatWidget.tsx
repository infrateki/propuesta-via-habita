"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  /** True while this assistant message is still streaming in. */
  streaming?: boolean;
  /** Soft error attached to a turn (e.g. rate-limit, auth). */
  error?: string;
};

const SUGGESTIONS = [
  "¿Cuánto cuesta la Fase 1 y cuándo se paga?",
  "¿Qué incluye el plan de $2.000 por proyecto?",
  "¿Cuál es el proyecto piloto y por qué?",
  "¿Cómo se compara con Autodesk Forma Build?",
];

const GREETING =
  "Soy el asistente de la propuesta VIA-HABITA. Pregúntame sobre alcance, precios, cronograma o el comparativo. Respondo con lo que figura en el documento v12.1.";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll on new content
  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => inputRef.current?.focus(), 150);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Cancel any in-flight stream on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(prompt: string) {
    const text = prompt.trim();
    if (!text || sending) return;

    setSending(true);
    const userTurn: ChatMessage = { role: "user", content: text };
    const assistantTurn: ChatMessage = {
      role: "assistant",
      content: "",
      streaming: true,
    };
    setMessages((prev) => [...prev, userTurn, assistantTurn]);
    setInput("");

    // Snapshot of the conversation we send to the server (user + prior
    // exchanges; do NOT include the empty assistant placeholder we just
    // added).
    const history = messages
      .filter((m) => !m.streaming && m.content.length > 0)
      .map((m) => ({ role: m.role, content: m.content }));

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: ac.signal,
        body: JSON.stringify({
          messages: [...history, { role: "user", content: text }],
        }),
      });

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        const msg =
          typeof body?.message === "string"
            ? body.message
            : typeof body?.error === "string"
              ? body.error
              : "no pude responder en este momento";
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            copy[copy.length - 1] = { ...last, streaming: false, content: msg, error: "fail" };
          }
          return copy;
        });
        return;
      }

      if (!resp.body) throw new Error("stream sin body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      // SSE parser: split by blank line, parse `event:` + `data:` pairs.
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buf.indexOf("\n\n")) !== -1) {
          const frame = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          const lines = frame.split("\n");
          let evt = "message";
          let dataStr = "";
          for (const line of lines) {
            if (line.startsWith("event:")) evt = line.slice(6).trim();
            else if (line.startsWith("data:")) dataStr += line.slice(5).trim();
          }
          if (!dataStr) continue;
          let data: unknown;
          try {
            data = JSON.parse(dataStr);
          } catch {
            continue;
          }

          if (evt === "delta" && typeof (data as { text?: unknown })?.text === "string") {
            const chunk = (data as { text: string }).text;
            setMessages((prev) => {
              const copy = [...prev];
              const last = copy[copy.length - 1];
              if (last?.role === "assistant" && last.streaming) {
                copy[copy.length - 1] = { ...last, content: last.content + chunk };
              }
              return copy;
            });
          } else if (evt === "error") {
            const errData = data as { code?: string; message?: string };
            const human =
              errData.code === "rate_limited"
                ? "estoy recibiendo muchas preguntas, esperá unos segundos"
                : errData.code === "auth_error"
                  ? "el chat no está autenticado; contactá a Sergio"
                  : errData.message || "no pude responder en este momento";
            setMessages((prev) => {
              const copy = [...prev];
              const last = copy[copy.length - 1];
              if (last?.role === "assistant") {
                copy[copy.length - 1] = { ...last, streaming: false, content: human, error: "fail" };
              }
              return copy;
            });
          } else if (evt === "done") {
            setMessages((prev) => {
              const copy = [...prev];
              const last = copy[copy.length - 1];
              if (last?.role === "assistant") {
                copy[copy.length - 1] = { ...last, streaming: false };
              }
              return copy;
            });
          }
        }
      }
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") {
          copy[copy.length - 1] = {
            ...last,
            streaming: false,
            content: "No pude conectar con el chat. Probá de nuevo en unos segundos.",
            error: "network",
          };
        }
        return copy;
      });
    } finally {
      setSending(false);
      abortRef.current = null;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Trigger button — bottom right, above FloatingCTA */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        initial={reduce ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
        className={cn(
          "fixed bottom-5 right-5 z-40",
          "size-12 rounded-full",
          "material-glass-strong chrome-edge",
          "flex items-center justify-center",
          "text-steel-100 hover:text-[var(--color-electric)]",
          "transition-colors duration-[var(--duration-fast)]",
          "shadow-[0_8px_30px_rgba(0,0,0,0.4)]",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={reduce ? false : { rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} strokeWidth={1.75} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={reduce ? false : { rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? undefined : { rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageSquare size={20} strokeWidth={1.75} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Chat de la propuesta"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className={cn(
              "fixed z-40",
              "bottom-20 right-5",
              "w-[min(92vw,380px)]",
              "h-[min(70vh,560px)]",
              "flex flex-col",
              "material-glass-strong chrome-edge",
              "rounded-[var(--radius-card)] overflow-hidden",
              "shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
            )}
          >
            {/* Header */}
            <header className="flex items-center gap-3 px-5 py-3.5 hairline-b">
              <div className="hairline rounded-full p-1.5">
                <Sparkles
                  className="size-3.5 text-[var(--color-copper)]"
                  strokeWidth={1.75}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="label-spec text-[var(--color-copper)]">
                  §CHAT
                </p>
                <p className="text-xs text-steel-400 truncate">
                  Asistente VIA-HABITA · v12.1
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="text-steel-400 hover:text-steel-100 transition-colors"
              >
                <X size={16} strokeWidth={1.75} />
              </button>
            </header>

            {/* Messages scroll area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            >
              {messages.length === 0 ? (
                <>
                  <p className="text-sm text-steel-300 leading-relaxed">
                    {GREETING}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {SUGGESTIONS.map((s) => (
                      <li key={s}>
                        <button
                          type="button"
                          onClick={() => send(s)}
                          disabled={sending}
                          className={cn(
                            "w-full text-left text-xs",
                            "hairline rounded-[var(--radius-spec)] px-3 py-2.5",
                            "text-steel-200 hover:text-steel-100",
                            "hover:bg-[var(--color-steel-700)]/40",
                            "transition-colors duration-[var(--duration-fast)]",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                          )}
                        >
                          {s}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                messages.map((m, i) => (
                  <MessageBubble key={i} message={m} />
                ))
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="hairline-t p-3 flex items-end gap-2 bg-[var(--color-steel-800)]/60"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Preguntá sobre la propuesta…"
                disabled={sending}
                maxLength={2000}
                className={cn(
                  "flex-1 resize-none bg-transparent",
                  "text-sm text-steel-100 placeholder:text-steel-500",
                  "outline-none focus:outline-none",
                  "min-h-9 max-h-32 py-2 px-2",
                  "disabled:opacity-50",
                )}
              />
              <button
                type="submit"
                aria-label="Enviar"
                disabled={!input.trim() || sending}
                className={cn(
                  "shrink-0 size-9 rounded-[var(--radius-spec)]",
                  "flex items-center justify-center",
                  "material-glass-strong chrome-edge",
                  "text-steel-100 hover:text-[var(--color-electric)]",
                  "transition-colors duration-[var(--duration-fast)]",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  "disabled:hover:text-steel-100",
                )}
              >
                <Send size={14} strokeWidth={1.75} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[var(--radius-spec)] px-3.5 py-2.5",
          "text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-[var(--color-electric)]/12 text-steel-100 hairline"
            : "bg-[var(--color-steel-700)]/50 text-steel-200 hairline",
          message.error && "text-[var(--color-warning)]",
        )}
      >
        {message.content}
        {message.streaming ? (
          <span
            aria-hidden
            className="inline-block w-1.5 h-3 bg-[var(--color-electric)]/80 ml-0.5 align-middle animate-pulse"
          />
        ) : null}
      </div>
    </div>
  );
}
