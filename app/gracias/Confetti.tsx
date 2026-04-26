"use client";

import { useEffect, useMemo, useState } from "react";

type Piece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  color: string;
  size: number;
};

const COLORS = [
  "var(--color-copper)",
  "#e8d5b7",
  "#9aa5b1",
  "#f5e6d3",
  "#7a8694",
];

export function Confetti({ count = 60 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setMounted(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const pieces = useMemo<Piece[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      duration: 2.6 + Math.random() * 2.4,
      rotate: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
    }));
  }, [count]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.4}px`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--rotate-end" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
      <style>{`
        .confetti-piece {
          position: absolute;
          top: -10vh;
          opacity: 0.95;
          border-radius: 1px;
          animation-name: confetti-fall;
          animation-timing-function: cubic-bezier(0.4, 0.1, 0.4, 1);
          animation-fill-mode: forwards;
          will-change: transform, opacity;
        }
        @keyframes confetti-fall {
          0% {
            transform: translate3d(0, -10vh, 0) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 110vh, 0) rotate(var(--rotate-end));
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
