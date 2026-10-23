import * as React from "react";
import { ProjectDecision as ProjectDecisionType } from "@/lib/projects";
import { CheckCircle2, AlertTriangle } from "lucide-react";

interface ProjectDecisionProps {
  decisions: ProjectDecisionType[];
}

export function ProjectDecision({ decisions }: ProjectDecisionProps) {
  return (
    <div className="space-y-6">
      {decisions.map((d, idx) => (
        <article
          key={d.title}
          className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-[#0c0c0f]/60 p-6 sm:p-7 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              0{idx + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight">
              {d.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
            {d.decision}
          </p>

          {/* Why vs Tradeoff Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Why Column */}
            <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Why This Decision</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {d.why}
              </p>
            </div>

            {/* Tradeoff Column */}
            <div className="p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.01] dark:bg-white/[0.02] space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-medium">
                <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Trade-Off Accepted</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {d.tradeoff}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
