"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function UptimeMonitoringVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.02] p-4 transition-all duration-300 group-hover:border-black/[0.16] dark:border-white/[0.08] dark:bg-[#0c0c0f]/80 dark:group-hover:border-white/[0.16] sm:p-5"
      aria-hidden="true"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-black/[0.06] pb-3 font-mono text-[10px] text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400 sm:text-[11px]">
        <span className="flex items-center gap-2 uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Scheduled HTTP Checks
        </span>
        <span className="text-emerald-600 dark:text-emerald-300">SERVICE MONITORING</span>
      </div>

      <div className="w-full overflow-x-auto scrollbar-none">
        <div className="aspect-[500/210] min-w-[340px] sm:min-w-0">
          <svg viewBox="0 0 500 210" fill="none" className="h-full w-full select-none">
            <path d="M 110 88 L 140 88" className="stroke-zinc-300 stroke-[1.5] dark:stroke-zinc-700" strokeDasharray="4 3" />
            <path d="M 225 88 L 255 88" className="stroke-zinc-300 stroke-[1.5] dark:stroke-zinc-700" strokeDasharray="4 3" />
            <path d="M 345 88 L 375 88" className="stroke-zinc-300 stroke-[1.5] dark:stroke-zinc-700" strokeDasharray="4 3" />
            <path d="M 185 118 L 185 153 L 175 153" className="stroke-zinc-300 stroke-[1.2] dark:stroke-zinc-700" strokeDasharray="3 3" />

            {!shouldReduceMotion && (
              <motion.circle
                r="3"
                className="fill-emerald-500"
                animate={{
                  cx: [110, 140, 225, 255, 345, 375],
                  cy: [88, 88, 88, 88, 88, 88],
                  opacity: [0, 1, 1, 1, 1, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <g transform="translate(20, 62)">
              <rect width="90" height="52" rx="7" className="fill-white stroke-black/[0.1] stroke-[1] dark:fill-zinc-900/90 dark:stroke-white/[0.12]" />
              <text x="10" y="21" className="fill-zinc-400 font-mono text-[8px] uppercase tracking-wider dark:fill-zinc-500">Target</text>
              <text x="10" y="38" className="fill-zinc-900 font-sans text-[10px] font-semibold dark:fill-zinc-100">HTTP / HTTPS</text>
            </g>
            <g transform="translate(140, 62)">
              <rect width="85" height="52" rx="7" className="fill-white stroke-sky-500/35 stroke-[1] dark:fill-zinc-900/90 dark:stroke-sky-400/35" />
              <text x="9" y="21" className="fill-sky-600 font-mono text-[8px] uppercase tracking-wider dark:fill-sky-400">Probe</text>
              <text x="9" y="38" className="fill-zinc-900 font-sans text-[10px] font-semibold dark:fill-zinc-100">Async Check</text>
            </g>
            <g transform="translate(255, 62)">
              <rect width="90" height="52" rx="7" className="fill-white stroke-black/[0.1] stroke-[1] dark:fill-zinc-900/90 dark:stroke-white/[0.12]" />
              <text x="9" y="21" className="fill-zinc-400 font-mono text-[8px] uppercase tracking-wider dark:fill-zinc-500">Persist</text>
              <text x="9" y="38" className="fill-zinc-900 font-sans text-[10px] font-semibold dark:fill-zinc-100">PostgreSQL</text>
            </g>
            <g transform="translate(375, 62)">
              <rect width="105" height="52" rx="7" className="fill-white stroke-amber-500/35 stroke-[1] dark:fill-zinc-900/90 dark:stroke-amber-400/35" />
              <text x="9" y="21" className="fill-amber-600 font-mono text-[8px] uppercase tracking-wider dark:fill-amber-400">Transition</text>
              <text x="9" y="38" className="fill-zinc-900 font-sans text-[10px] font-semibold dark:fill-zinc-100">Incident + Alert</text>
            </g>
            <g transform="translate(175, 138)">
              <rect width="150" height="30" rx="6" className="fill-white stroke-black/[0.08] stroke-[1] dark:fill-zinc-900/90 dark:stroke-white/[0.1]" />
              <text x="12" y="19" className="fill-zinc-500 font-mono text-[9px] uppercase tracking-wider dark:fill-zinc-400">Prometheus Metrics</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.06] pt-3 font-mono text-[10px] text-zinc-400 dark:border-white/[0.06] dark:text-zinc-500">
        <span>FastAPI</span>
        <span>Email / Webhook Alerts</span>
        <span>Grafana Dashboards</span>
      </div>
    </div>
  );
}
