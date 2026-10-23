"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

export function AiKnowledgeVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="relative w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-[#0c0c0f]/80 p-4 sm:p-5 overflow-hidden transition-all duration-300 group-hover:border-black/[0.16] dark:group-hover:border-white/[0.16]"
      aria-hidden="true"
    >
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.06] font-mono text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="uppercase tracking-wider">RAG Pipeline &middot; Hybrid Search</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 dark:text-zinc-600">SOURCE CITATION:</span>
          <span className="text-purple-600 dark:text-purple-300 font-medium">VERIFIED (100%)</span>
        </div>
      </div>

      {/* RAG Knowledge Retrieval SVG */}
      <div className="relative w-full overflow-x-auto scrollbar-none">
        <div className="min-w-[340px] sm:min-w-0 aspect-[500/210]">
          <svg
          viewBox="0 0 500 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          {/* Subtle document cluster matrix background */}
          <rect x="160" y="35" width="130" height="140" rx="10" className="fill-purple-500/[0.02] dark:fill-purple-500/[0.03] stroke-purple-500/[0.15] dark:stroke-purple-400/[0.15] stroke-[1]" strokeDasharray="3 3" />
          <text x="170" y="55" className="fill-purple-600 dark:fill-purple-400 font-mono text-[8px] uppercase tracking-wider">
            Vector Index
          </text>

          {/* Connection Lines */}
          <path d="M 115 105 L 160 105" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />
          <path d="M 290 105 L 330 105" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />

          {/* Document Chunks inside Index */}
          <rect x="175" y="70" width="100" height="18" rx="4" className="fill-white dark:fill-zinc-800 stroke-purple-500/30 stroke-[1]" />
          <text x="183" y="82" className="fill-zinc-600 dark:fill-zinc-300 font-mono text-[8px]">Chunk #1 [0.94]</text>

          <rect x="175" y="96" width="100" height="18" rx="4" className="fill-white dark:fill-zinc-800 stroke-purple-500/50 stroke-[1]" />
          <text x="183" y="108" className="fill-zinc-900 dark:fill-zinc-100 font-mono text-[8px] font-medium">Chunk #2 [0.98]</text>

          <rect x="175" y="122" width="100" height="18" rx="4" className="fill-white dark:fill-zinc-800 stroke-purple-500/30 stroke-[1]" />
          <text x="183" y="134" className="fill-zinc-600 dark:fill-zinc-300 font-mono text-[8px]">Chunk #3 [0.89]</text>

          {/* Animated Retrieval Pulse */}
          {!shouldReduceMotion && (
            <motion.circle
              r="3"
              className="fill-purple-500 dark:fill-purple-400"
              animate={{
                cx: [115, 160, 225, 290, 330],
                cy: [105, 105, 105, 105, 105],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Node 1: User Query */}
          <g transform="translate(10, 75)">
            <rect width="105" height="60" rx="8" className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]" />
            <text x="10" y="24" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">
              Query
            </text>
            <text x="10" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">
              Hybrid Input
            </text>
          </g>

          {/* Node 2: Synthesis Engine */}
          <g transform="translate(330, 70)">
            <rect width="160" height="70" rx="8" className="fill-white dark:fill-zinc-900/90 stroke-purple-500/30 dark:stroke-purple-400/30 stroke-[1]" />
            <text x="10" y="22" className="fill-purple-600 dark:fill-purple-400 font-mono text-[8px] uppercase tracking-wider">
              Grounded Model
            </text>
            <text x="10" y="40" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[11px]">
              Ollama / LLM
            </text>
            <text x="10" y="56" className="fill-zinc-500 dark:fill-zinc-400 font-mono text-[9px]">
              [Doc &sect;4.2 Cited]
            </text>
          </g>
          </svg>
        </div>
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.06] font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
        <span>Embedding: Local / Fast</span>
        <span>Re-ranking: Cross-Encoder</span>
        <span className="hidden sm:inline">Zero Data Leakage</span>
      </div>
    </div>
  );
}
