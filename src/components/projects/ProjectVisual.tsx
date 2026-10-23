"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { ProjectCaseStudy } from "@/lib/projects";
import { ProjectScreenshots } from "@/components/projects/ProjectScreenshots";

const ResilientOrderVisual = dynamic(
  () => import("@/components/work/ResilientOrderVisual").then((m) => m.ResilientOrderVisual),
  {
    loading: () => (
      <div className="w-full h-72 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] animate-pulse flex items-center justify-center font-mono text-xs text-zinc-500">
        Loading architecture visual...
      </div>
    ),
    ssr: false,
  }
);

const AgenticSocVisual = dynamic(
  () => import("@/components/work/AgenticSocVisual").then((m) => m.AgenticSocVisual),
  {
    loading: () => (
      <div className="w-full h-72 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] animate-pulse flex items-center justify-center font-mono text-xs text-zinc-500">
        Loading architecture visual...
      </div>
    ),
    ssr: false,
  }
);

const AiKnowledgeVisual = dynamic(
  () => import("@/components/work/AiKnowledgeVisual").then((m) => m.AiKnowledgeVisual),
  {
    loading: () => (
      <div className="w-full h-72 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] animate-pulse flex items-center justify-center font-mono text-xs text-zinc-500">
        Loading architecture visual...
      </div>
    ),
    ssr: false,
  }
);

const UptimeMonitoringVisual = dynamic(
  () => import("@/components/work/UptimeMonitoringVisual").then((m) => m.UptimeMonitoringVisual),
  {
    loading: () => (
      <div className="flex h-72 w-full animate-pulse items-center justify-center rounded-2xl border border-black/[0.06] bg-black/[0.02] font-mono text-xs text-zinc-500 dark:border-white/[0.06] dark:bg-white/[0.02]">
        Loading monitoring visual...
      </div>
    ),
    ssr: false,
  },
);

interface ProjectVisualProps {
  project: ProjectCaseStudy;
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  const shouldReduceMotion = useReducedMotion();

  // Project-specific visualization router
  const renderVisual = () => {
    switch (project.slug) {
      case "resilient-order-processing":
        return <ResilientOrderVisual />;

      case "agentic-soc":
        return <AgenticSocVisual />;

      case "ai-knowledge-system":
        return <AiKnowledgeVisual />;

      case "uptime-monitoring-system":
        return <UptimeMonitoringVisual />;

      case "text-to-sql-engine":
        return <TextToSqlVisual shouldReduceMotion={shouldReduceMotion} />;

      case "forge-gym":
        return <ProjectScreenshots screenshots={project.screenshots ?? []} />;

      default:
        return null;
    }
  };

  return (
    <section aria-label="System Visualization" className="py-8 sm:py-10">
      <div className="w-full rounded-3xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.015] p-3 sm:p-5">
        {renderVisual()}
      </div>
    </section>
  );
}

// Text-to-SQL Interactive Translation Visual
function TextToSqlVisual({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <div className="relative w-full rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-[#0c0c0f]/80 p-4 sm:p-5 overflow-hidden font-mono">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-black/[0.06] dark:border-white/[0.06] text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
          <span className="uppercase tracking-wider">SQL AST Engine <span aria-hidden="true">&middot;</span> Sandboxed</span>
        </div>
        <div>
          <span className="text-zinc-400 dark:text-zinc-600">GUARDRAIL:</span>
          <span className="text-cyan-600 dark:text-cyan-300 font-medium ml-1">SELECT ONLY</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto scrollbar-none">
        <div className="min-w-[340px] sm:min-w-0 aspect-[500/200]">
          <svg viewBox="0 0 500 200" fill="none" role="img" aria-label="Text to SQL engine architecture diagram" className="w-full h-full select-none">
            <path d="M 115 95 L 145 95" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />
            <path d="M 250 95 L 285 95" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />
            <path d="M 385 95 L 415 95" className="stroke-zinc-300 dark:stroke-zinc-700 stroke-[1.5]" strokeDasharray="4 3" />

            {!shouldReduceMotion && (
              <motion.circle
                r="3"
                className="fill-cyan-500"
                animate={{
                  cx: [115, 145, 250, 285, 385, 415],
                  cy: [95, 95, 95, 95, 95, 95],
                  opacity: [0, 1, 1, 1, 1, 0],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {/* Node 1: Prompt Ingestion */}
            <g transform="translate(10, 65)">
              <rect width="105" height="60" rx="8" className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]" />
              <text x="10" y="24" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">Input</text>
              <text x="10" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">Plain English</text>
            </g>

            {/* Node 2: Local Code Model */}
            <g transform="translate(145, 65)">
              <rect width="105" height="60" rx="8" className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]" />
              <text x="10" y="24" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">Generator</text>
              <text x="10" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">Ollama LLM</text>
            </g>

            {/* Node 3: AST Syntax Guardrail */}
            <g transform="translate(285, 65)">
              <rect width="100" height="60" rx="8" className="fill-white dark:fill-zinc-900/90 stroke-cyan-500/40 dark:stroke-cyan-400/40 stroke-[1]" />
              <text x="10" y="24" className="fill-cyan-600 dark:fill-cyan-400 font-mono text-[8px] uppercase tracking-wider">AST Filter</text>
              <text x="10" y="42" className="fill-zinc-900 dark:fill-zinc-100 font-sans font-semibold text-[10px]">SQLGlot</text>
            </g>

            {/* Node 4: Read-Only DB */}
            <g transform="translate(415, 65)">
              <rect width="75" height="60" rx="8" className="fill-white dark:fill-zinc-900/90 stroke-black/[0.1] dark:stroke-white/[0.12] stroke-[1]" />
              <text x="10" y="26" className="fill-zinc-400 dark:fill-zinc-500 font-mono text-[8px] uppercase tracking-wider">DB</text>
              <text x="10" y="44" className="fill-zinc-900 dark:fill-zinc-100 font-mono font-semibold text-[9px]">Replica</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.06] text-[10px] text-zinc-400 dark:text-zinc-500">
        <span>Execution: Read-Only Transaction</span>
        <span>Timeout: 3,000ms</span>
        <span>AST Safety: Enforced</span>
      </div>
    </div>
  );
}

