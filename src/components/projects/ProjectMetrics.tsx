import * as React from "react";
import { ProjectMetric } from "@/lib/projects";

interface ProjectMetricsProps {
  metrics?: ProjectMetric[] | null;
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  // Enforce rule: never render when no metrics exist
  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="p-3.5 sm:p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-[#0c0c0f]/60 space-y-1.5"
        >
          <div className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 font-mono">
            {m.value}
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {m.label}
          </div>
          {m.detail && (
            <p className="text-[11px] text-zinc-600 dark:text-zinc-500 leading-tight pt-1">
              {m.detail}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
