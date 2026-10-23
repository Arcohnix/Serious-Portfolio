"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function ResilientOrderVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-[#0c0c0f]/80 p-4 sm:p-5 overflow-hidden transition-all duration-300 group-hover:border-black/[0.16] dark:group-hover:border-white/[0.16]"
      aria-hidden="true"
    >
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.06] font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-wider">Kafka Stream &middot; Partition 0-2</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-600">IDEMPOTENCY:</span>
          <span className="text-zinc-800 dark:text-zinc-200 font-medium">ON (UUIDv7)</span>
        </div>
      </div>

      {/* Architecture SVG Workflow */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <div className="min-w-[340px] sm:min-w-0 aspect-[520/210]">
          <svg
          viewBox="0 0 520 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          {/* Background Grid Pattern */}
          <pattern
            id="resilient-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" className="fill-black/[0.04] dark:fill-white/[0.04]" />
          </pattern>
          <rect width="520" height="210" fill="url(#resilient-grid)" />

          {/* Connection Lines */}
          {/* Main Path: Ingress -> Kafka -> Consumer -> Database */}
          <path
            d="M 115 75 L 155 75"
            className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]"
            strokeDasharray="4 3"
          />
          <path
            d="M 255 75 L 295 75"
            className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]"
            strokeDasharray="4 3"
          />
          <path
            d="M 400 75 L 420 75"
            className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]"
            strokeDasharray="4 3"
          />

          {/* DLQ Failure Recovery Loop: Consumer -> DLQ -> Retry Broker */}
          <path
            d="M 347 105 L 347 155 L 205 155 L 205 105"
            className="stroke-zinc-300 dark:stroke-zinc-800 stroke-[1.5]"
            strokeDasharray="3 3"
          />

          {/* Subtle Animated Data Packet Pulse */}
          {!shouldReduceMotion && (
            <>
              {/* Main flow packet */}
              <motion.circle
                r="3"
                className="fill-sky-500 dark:fill-sky-400"
                animate={{
                  cx: [115, 155, 255, 295, 400, 420],
                  cy: [75, 75, 75, 75, 75, 75],
                  opacity: [0, 1, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* DLQ recovery packet */}
              <motion.circle
                r="2.5"
                className="fill-rose-500/80 dark:fill-rose-400/80"
                animate={{
                  cx: [347, 347, 205, 205],
                  cy: [105, 155, 155, 105],
                  opacity: [0, 0.9, 0.9, 0],
                }}
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  delay: 1.4,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* Node 1: API Gateway (Ingress) */}
          <g transform="translate(10, 45)">
            <rect
            width="105"
              height="60"
              rx="8"
              className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]"
            />
            <text x="12" y="24" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[9px] uppercase tracking-wider">
              Ingress
            </text>
            <text x="12" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[11px]">
              REST / API
            </text>
          </g>

          {/* Node 2: Kafka Topic (Buffer) */}
          <g transform="translate(155, 45)">
            <rect
            width="100"
              height="60"
              rx="8"
              className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]"
            />
            <text x="12" y="24" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[9px] uppercase tracking-wider">
              Event Bus
            </text>
            <text x="12" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[11px]">
              Kafka Topic
            </text>
          </g>

          {/* Node 3: Consumer Worker (Processor) */}
          <g transform="translate(295, 45)">
            <rect
            width="105"
              height="60"
              rx="8"
              className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]"
            />
            <text x="12" y="24" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[9px] uppercase tracking-wider">
              Worker
            </text>
            <text x="12" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[11px]">
              Spring Boot
            </text>
          </g>

          {/* Node 4: PostgreSQL (Outbox & Ledger) */}
          <g transform="translate(420, 45)">
            <rect
            width="75"
              height="60"
              rx="8"
              className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]"
            />
            <text x="10" y="26" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">
              Outbox
            </text>
            <text x="10" y="44" className="fill-zinc-900 dark:fill-zinc-100 font-mono font-semibold text-[10px]">
              PGSQL
            </text>
          </g>

          {/* Branch Label: DLQ & Replay */}
          <g transform="translate(230, 142)">
            <rect
              width="100"
              height="24"
              rx="4"
              className="fill-zinc-100 dark:fill-zinc-900 stroke-rose-500/30 dark:stroke-rose-400/30 stroke-[1]"
            />
            <text x="10" y="16" className="fill-rose-700 dark:fill-rose-300 font-mono text-[9px] font-medium">
              DLQ / Replay
            </text>
          </g>
          </svg>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.06] font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
        <span>Delivery: At-least-once</span>
        <span>Outbox CDC: 0ms lag</span>
        <span className="hidden sm:inline">Recovery: Auto-DLQ</span>
      </div>
    </div>
  );
}
