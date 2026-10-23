import * as React from "react";
import { ProjectChallenge as ProjectChallengeType } from "@/lib/projects";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface ProjectChallengeProps {
  challenges: ProjectChallengeType[];
}

export function ProjectChallenge({ challenges }: ProjectChallengeProps) {
  return (
    <div className="space-y-5">
      {challenges.map((c, idx) => (
        <article
          key={c.title}
          className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-[#0c0c0f]/60 p-6 sm:p-7 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                0{idx + 1}
              </span>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-zinc-50 tracking-tight">
                {c.title}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/[0.05]">
              Failure Mode
            </span>
          </div>

          {/* Scenario & Risk */}
          <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              <strong className="text-zinc-900 dark:text-zinc-200 font-medium">Scenario: </strong>
              {c.scenario}
            </p>
            <p className="flex items-start gap-2 pt-1 text-zinc-700 dark:text-zinc-300">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="font-medium text-rose-600 dark:text-rose-400">Risk: </strong>
                {c.risk}
              </span>
            </p>
          </div>

          {/* Engineered Mitigation Callout */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] flex items-start gap-2.5 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-0.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-medium block">
                Engineered Mitigation
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {c.mitigation}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
