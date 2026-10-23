"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function AgenticSocVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-[#0c0c0f]/80 p-4 sm:p-5 overflow-hidden transition-all duration-300 group-hover:border-black/[0.16] dark:group-hover:border-white/[0.16]"
      aria-hidden="true"
    >
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.06] font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="uppercase tracking-wider">Tshark &middot; Ingress Stream</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-600">TRIAGE:</span>
          <span className="text-rose-600 dark:text-rose-300 font-medium">MITIGATED</span>
        </div>
      </div>

      {/* Security Telemetry & Agent Graph SVG */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <div className="min-w-[340px] sm:min-w-0 aspect-[510/210]">
          <svg
          viewBox="0 0 510 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          {/* Radar / Grid Background */}
          <circle cx="230" cy="105" r="90" className="stroke-black/[0.04] dark:stroke-white/[0.04]" strokeDasharray="3 3" />
          <circle cx="230" cy="105" r="55" className="stroke-black/[0.04] dark:stroke-white/[0.04]" strokeDasharray="3 3" />
          <line x1="230" y1="15" x2="230" y2="195" className="stroke-black/[0.03] dark:stroke-white/[0.03]" />
          <line x1="140" y1="105" x2="320" y2="105" className="stroke-black/[0.03] dark:stroke-white/[0.03]" />

          {/* Network Graph Interconnects */}
          <path d="M 130 105 L 150 65" className="stroke-zinc-300 dark:stroke-zinc-800 stroke-[1.2]" />
          <path d="M 130 105 L 150 145" className="stroke-zinc-300 dark:stroke-zinc-800 stroke-[1.2]" />
          <path d="M 150 65 L 220 105" className="stroke-zinc-300 dark:stroke-zinc-800 stroke-[1.2]" />
          <path d="M 150 145 L 220 105" className="stroke-zinc-300 dark:stroke-zinc-800 stroke-[1.2]" />
          <path d="M 275 105 L 290 105" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />
          <path d="M 385 105 L 395 105" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />

          {/* Animated Anomaly / Telemetry Signal */}
          {!shouldReduceMotion && (
            <>
              <motion.circle
                r="3"
                className="fill-rose-500"
                animate={{
                  cx: [130, 150, 275, 290, 395],
                  cy: [105, 65, 105, 105, 105],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                cx="220"
                cy="105"
                r="14"
                className="stroke-rose-500/40"
                strokeWidth="1.5"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </>
          )}

          {/* Ingress Node */}
          <g transform="translate(25, 80)">
            <rect width="105" height="50" rx="6" className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]" />
            <text x="10" y="20" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">
              Sniffer
            </text>
            <text x="10" y="36" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">
              PCAP / Tshark
            </text>
          </g>

          {/* Host Subnet Nodes (Graph Topology) */}
          <circle cx="150" cy="65" r="7" className="fill-zinc-200 dark:fill-zinc-800 stroke-zinc-400 dark:stroke-zinc-600 stroke-[1]" />
          <circle cx="150" cy="145" r="7" className="fill-zinc-200 dark:fill-zinc-800 stroke-zinc-400 dark:stroke-zinc-600 stroke-[1]" />

          {/* Anomaly Detection Center (PyTorch Geometric) */}
          <g transform="translate(180, 75)">
            <rect width="95" height="60" rx="6" className="fill-white dark:fill-zinc-900/90 stroke-rose-500/30 dark:stroke-rose-500/40 stroke-[1]" />
            <text x="8" y="22" className="fill-rose-600 dark:fill-rose-400 font-mono text-[8px] uppercase tracking-wider">
              Anomaly GNN
            </text>
            <text x="8" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">
              PyG Topology
            </text>
          </g>

          {/* Agent Orchestrator (LangGraph) */}
          <g transform="translate(290, 75)">
            <rect width="95" height="60" rx="6" className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]" />
            <text x="8" y="22" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">
              Agent Workflow
            </text>
            <text x="8" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">
              LangGraph
            </text>
          </g>

          {/* Mitigation / Policy Output */}
          <g transform="translate(395, 80)">
            <rect width="105" height="50" rx="6" className="fill-white dark:fill-zinc-900/90 stroke-emerald-500/30 dark:stroke-emerald-400/30 stroke-[1]" />
            <text x="8" y="20" className="fill-emerald-600 dark:fill-emerald-400 font-mono text-[8px] uppercase tracking-wider">
              Policy Action
            </text>
            <text x="8" y="36" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">
              IP Quarantine
            </text>
          </g>
          </svg>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.06] font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
        <span>GNN Anomaly Engine</span>
        <span>Threat Confidence: 94.2%</span>
        <span className="hidden sm:inline">Action: Auto-Blocked</span>
      </div>
    </div>
  );
}
